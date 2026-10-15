import { getGenAI } from "@/lib/ai/gemini";
import { reindex } from "@/lib/ai/reindex";
import { jsonError, secretsMatch } from "@/lib/http";
import { logError } from "@/lib/log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Weekly Vercel Cron (see vercel.json). Vercel sends `Authorization: Bearer $CRON_SECRET`. */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!secretsMatch(auth?.replace(/^Bearer /, ""), process.env.CRON_SECRET)) {
    return jsonError(401, "UNAUTHORIZED", "Missing or invalid cron secret.");
  }
  const ai = getGenAI();
  const db = getSupabaseAdmin();
  if (!ai || !db) return jsonError(503, "UNAVAILABLE", "Gemini or Supabase is not configured.");
  try {
    const result = await reindex(ai, db);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    logError("api/cron/reindex", "REINDEX", err);
    return jsonError(500, "INTERNAL", "Re-index failed; the previous index is unchanged.");
  }
}
