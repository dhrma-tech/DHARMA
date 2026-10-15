import { GITHUB_REVALIDATE, getGitHubActivity } from "@/lib/github";
import { jsonError } from "@/lib/http";

export const runtime = "nodejs";
export const revalidate = 3600; // must be a literal; matches GITHUB_REVALIDATE

export async function GET() {
  const activity = await getGitHubActivity();
  if (!activity) return jsonError(503, "UNAVAILABLE", "GitHub activity is unavailable right now.");
  return Response.json(activity, {
    headers: { "Cache-Control": `public, s-maxage=${GITHUB_REVALIDATE}, stale-while-revalidate=86400` },
  });
}
