import { getAllPosts, getAllProjects } from "@/lib/content";
import { getClientIp, hashIp, isSameOrigin, jsonError } from "@/lib/http";
import { logError } from "@/lib/log";
import { RULES, rateLimit } from "@/lib/ratelimit";
import { slugSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROUTE = "api/views";
const NO_STORE = { "Cache-Control": "no-store" };

type Ctx = { params: { slug: string } };

/** Only real projects/posts get counters, so the table can't be spammed with junk slugs. */
function isKnownSlug(slug: string) {
  return getAllProjects().some((p) => p.slug === slug) || getAllPosts().some((p) => p.slug === slug);
}

function validate(slug: string): Response | null {
  if (!slugSchema.safeParse(slug).success || !isKnownSlug(slug)) {
    return jsonError(404, "NOT_FOUND", "Unknown slug.");
  }
  return null;
}

async function readViews(slug: string): Promise<number | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;
  const { data, error } = await db.from("page_views").select("views").eq("slug", slug).maybeSingle();
  if (error) {
    logError(ROUTE, "DB_READ", error.message);
    return null;
  }
  return data?.views ?? 0;
}

export async function GET(_req: Request, { params }: Ctx) {
  const invalid = validate(params.slug);
  if (invalid) return invalid;
  const views = await readViews(params.slug);
  if (views === null) return jsonError(503, "UNAVAILABLE", "View counts are unavailable.");
  return Response.json({ views }, { headers: NO_STORE });
}

export async function POST(req: Request, { params }: Ctx) {
  if (!isSameOrigin(req)) return jsonError(403, "FORBIDDEN", "Cross-origin requests are not allowed.");
  const invalid = validate(params.slug);
  if (invalid) return invalid;
  const db = getSupabaseAdmin();
  if (!db) return jsonError(503, "UNAVAILABLE", "View counts are unavailable.");

  // One increment per slug per visitor per hour; repeats just read the count.
  const limit = await rateLimit(RULES.view, `${hashIp(getClientIp(req))}:${params.slug}`);
  if (!limit.success) {
    const views = await readViews(params.slug);
    return views === null
      ? jsonError(503, "UNAVAILABLE", "View counts are unavailable.")
      : Response.json({ views }, { headers: NO_STORE });
  }

  const { data, error } = await db.rpc("increment_view", { p_slug: params.slug });
  if (error) {
    logError(ROUTE, "DB_INCREMENT", error.message);
    return jsonError(503, "UNAVAILABLE", "View counts are unavailable.");
  }
  return Response.json({ views: Number(data) }, { headers: NO_STORE });
}
