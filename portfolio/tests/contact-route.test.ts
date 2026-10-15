import { beforeEach, describe, expect, it, vi } from "vitest";

const insert = vi.fn();
const sendContactEmail = vi.fn();
let dbConfigured = true;
let emailConfigured = true;

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: () => (dbConfigured ? { from: () => ({ insert }) } : null),
}));
vi.mock("@/lib/email", () => ({
  isEmailConfigured: () => emailConfigured,
  sendContactEmail: (...args: unknown[]) => sendContactEmail(...args),
}));

import { POST } from "@/app/api/contact/route";
import { createMemoryLimiter, setLimiter } from "@/lib/ratelimit";

const valid = { name: "Ada", email: "ada@example.com", message: "Loved the DStack write-up!" };

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "1.2.3.4", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    setLimiter(createMemoryLimiter());
    insert.mockReset().mockResolvedValue({ error: null });
    sendContactEmail.mockReset().mockResolvedValue(undefined);
    dbConfigured = true;
    emailConfigured = true;
  });

  it("stores and emails a valid message", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ name: "Ada", source: "contact-form" }));
    expect(insert.mock.calls[0][0].ip_hash).toMatch(/^[0-9a-f]{64}$/);
    expect(sendContactEmail).toHaveBeenCalledOnce();
  });

  it("silently drops honeypot submissions", async () => {
    const res = await POST(req({ ...valid, website: "http://spam" }));
    expect(res.status).toBe(200);
    expect(insert).not.toHaveBeenCalled();
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("returns a typed validation error", async () => {
    const res = await POST(req({ ...valid, email: "nope" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("VALIDATION");
  });

  it("rejects invalid JSON and oversized bodies", async () => {
    expect((await POST(req("{oops"))).status).toBe(400);
    expect((await POST(req({ ...valid, message: "x".repeat(9000) }))).status).toBe(413);
  });

  it("rejects cross-origin posts", async () => {
    const res = await POST(req(valid, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("rate-limits to 3 per hour per IP", async () => {
    for (let i = 0; i < 3; i++) expect((await POST(req(valid))).status).toBe(200);
    const res = await POST(req(valid));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBeTruthy();
  });

  it("succeeds if only the email goes through", async () => {
    insert.mockResolvedValue({ error: { message: "db down" } });
    expect((await POST(req(valid))).status).toBe(200);
  });

  it("fails when neither storage nor email works", async () => {
    insert.mockResolvedValue({ error: { message: "db down" } });
    sendContactEmail.mockRejectedValue(new Error("resend down"));
    expect((await POST(req(valid))).status).toBe(500);
  });

  it("returns 503 when nothing is configured", async () => {
    dbConfigured = false;
    emailConfigured = false;
    expect((await POST(req(valid))).status).toBe(503);
  });
});
