import { getClientIp, hashIp, isSameOrigin, jsonError, parseJson, retryAfter } from "@/lib/http";
import { logError } from "@/lib/log";
import { RULES, rateLimit } from "@/lib/ratelimit";
import { contactSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROUTE = "api/contact";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return jsonError(403, "FORBIDDEN", "Cross-origin requests are not allowed.");

  const parsed = await parseJson(req, contactSchema);
  if (!parsed.ok) return parsed.response;
  const { website, ...msg } = parsed.data;

  // Honeypot filled → pretend success so bots learn nothing.
  if (website) return Response.json({ ok: true });

  const ipHash = hashIp(getClientIp(req));
  const limit = await rateLimit(RULES.contact, ipHash);
  if (!limit.success) {
    return jsonError(429, "RATE_LIMITED", "Too many messages — try again in an hour, or email me directly.", retryAfter(limit.reset));
  }

  const db = getSupabaseAdmin();
  if (!db && !isEmailConfigured()) {
    logError(ROUTE, "NOT_CONFIGURED");
    return jsonError(503, "UNAVAILABLE", "The contact form is offline — please email me directly.");
  }

  // Store first, then email. Either one succeeding means the message reached me.
  let stored = false;
  if (db) {
    const { error } = await db.from("contact_messages").insert({
      name: msg.name,
      email: msg.email,
      message: msg.message,
      source: msg.source ?? "contact-form",
      ip_hash: ipHash,
    });
    if (error) logError(ROUTE, "DB_INSERT", error.message);
    else stored = true;
  }

  let emailed = false;
  if (isEmailConfigured()) {
    try {
      await sendContactEmail(msg);
      emailed = true;
    } catch (err) {
      logError(ROUTE, "EMAIL_SEND", err);
    }
  }

  if (!stored && !emailed) {
    return jsonError(500, "INTERNAL", "Something went wrong sending your message. Please try again.");
  }
  return Response.json({ ok: true });
}
