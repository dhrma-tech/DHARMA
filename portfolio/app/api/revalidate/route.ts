import { revalidatePath, revalidateTag } from "next/cache";
import { jsonError, secretsMatch } from "@/lib/http";
import { PUBLIC_CACHE_TAG } from "@/lib/supabase/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Purges cached Supabase reads and re-renders the homepage. Header: `x-revalidate-secret`. */
export async function POST(req: Request) {
  if (!secretsMatch(req.headers.get("x-revalidate-secret"), process.env.REVALIDATE_SECRET)) {
    return jsonError(401, "UNAUTHORIZED", "Missing or invalid revalidate secret.");
  }
  revalidateTag(PUBLIC_CACHE_TAG);
  revalidatePath("/");
  return Response.json({ ok: true, revalidated: ["/"], at: new Date().toISOString() });
}
