import { createHash, timingSafeEqual } from "node:crypto";
import type { z } from "zod";

export type ErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION"
  | "PAYLOAD_TOO_LARGE"
  | "FORBIDDEN"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "DAILY_LIMIT"
  | "UNAVAILABLE"
  | "INTERNAL";

export function jsonError(status: number, code: ErrorCode, message: string, headers?: HeadersInit) {
  return Response.json({ error: { code, message } }, { status, headers });
}

export function retryAfter(reset: number): HeadersInit {
  return { "Retry-After": String(Math.max(1, Math.ceil((reset - Date.now()) / 1000))) };
}

/** Client IP as seen by Vercel's proxy (first hop of x-forwarded-for). */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** sha256(ip + salt). Raw IPs are never stored or used as limiter keys. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip + (process.env.IP_HASH_SALT ?? "")).digest("hex");
}

/**
 * Same-origin guard for browser POSTs. Requests without an Origin header (curl,
 * server-to-server) pass; anything a browser marks cross-site is rejected.
 */
export function isSameOrigin(req: Request): boolean {
  if (req.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export type ParseResult<T> = { ok: true; data: T } | { ok: false; response: Response };

/** Reads a JSON body capped at `maxBytes`, then validates it with `schema`. */
export async function parseJson<T>(req: Request, schema: z.ZodType<T>, maxBytes = 8 * 1024): Promise<ParseResult<T>> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > maxBytes) {
    return { ok: false, response: jsonError(413, "PAYLOAD_TOO_LARGE", "Request body is too large.") };
  }
  const text = await req.text();
  if (Buffer.byteLength(text) > maxBytes) {
    return { ok: false, response: jsonError(413, "PAYLOAD_TOO_LARGE", "Request body is too large.") };
  }
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return { ok: false, response: jsonError(400, "BAD_REQUEST", "Body must be valid JSON.") };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path.join(".");
    return {
      ok: false,
      response: jsonError(400, "VALIDATION", field ? `${field}: ${issue.message}` : (issue?.message ?? "Invalid body.")),
    };
  }
  return { ok: true, data: parsed.data };
}

/** Constant-time comparison for shared secrets. */
export function secretsMatch(given: string | null | undefined, expected: string | undefined): boolean {
  if (!given || !expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
