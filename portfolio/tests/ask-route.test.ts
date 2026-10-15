import { beforeEach, describe, expect, it, vi } from "vitest";

const insert = vi.fn();
const rpc = vi.fn();
const embedContent = vi.fn();
const generateContentStream = vi.fn();
let configured = true;

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: () => (configured ? { rpc, from: () => ({ insert }) } : null),
}));
vi.mock("@/lib/ai/gemini", async (orig) => ({
  ...(await orig<typeof import("@/lib/ai/gemini")>()),
  getGenAI: () => (configured ? { models: { embedContent, generateContentStream } } : null),
}));

import { POST } from "@/app/api/ask/route";
import { SOURCES_HEADER, REFUSAL } from "@/lib/ai/constants";
import { createMemoryLimiter, setLimiter } from "@/lib/ratelimit";

async function* streamOf(parts: string[]) {
  for (const text of parts) yield { text };
}

function req(body: unknown, ip = "1.2.3.4") {
  return new Request("http://localhost/api/ask", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const QUESTION = { question: "What is DStack?" };

describe("POST /api/ask", () => {
  beforeEach(() => {
    setLimiter(createMemoryLimiter());
    configured = true;
    insert.mockReset().mockResolvedValue({ error: null });
    embedContent.mockReset().mockResolvedValue({ embeddings: [{ values: Array(768).fill(0.1) }] });
    rpc.mockReset().mockResolvedValue({
      data: [
        { source: "project:dstack", title: "DStack", content: "DStack is a CLI.", similarity: 0.8 },
        { source: "about", title: "About", content: "Mechatronics student.", similarity: 0.5 },
      ],
      error: null,
    });
    generateContentStream.mockReset().mockImplementation(async () => streamOf(["Dharma built ", "DStack, a CLI."]));
  });

  it("streams a grounded answer with source chips and logs the query", async () => {
    const res = await POST(req(QUESTION));
    expect(res.status).toBe(200);
    expect(JSON.parse(decodeURIComponent(res.headers.get(SOURCES_HEADER)!))).toEqual(["DStack", "About"]);
    expect(await res.text()).toBe("Dharma built DStack, a CLI.");

    expect(rpc).toHaveBeenCalledWith("match_chunks", expect.objectContaining({ match_count: 5 }));
    const call = generateContentStream.mock.calls[0][0];
    expect(call.config.systemInstruction).toContain(REFUSAL);
    expect(call.contents[0].parts[0].text).toContain("DStack is a CLI.");
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ question: "What is DStack?", answered: true }));
    expect(insert.mock.calls[0][0].ip_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("logs refusals as unanswered", async () => {
    generateContentStream.mockImplementation(async () => streamOf([`${REFUSAL} at the contact form below.`]));
    const res = await POST(req({ question: "Capital of France?" }));
    await res.text();
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ answered: false }));
  });

  it("validates the question", async () => {
    const res = await POST(req({ question: "x".repeat(301) }));
    expect(res.status).toBe(400);
    expect(generateContentStream).not.toHaveBeenCalled();
  });

  it("limits each IP to 10 questions per hour", async () => {
    for (let i = 0; i < 10; i++) expect((await POST(req(QUESTION))).status).toBe(200);
    const res = await POST(req(QUESTION));
    expect(res.status).toBe(429);
    expect((await res.json()).error.code).toBe("RATE_LIMITED");
  });

  it("enforces the global daily cap", async () => {
    for (let i = 0; i < 200; i++) await POST(req(QUESTION, `10.0.${i >> 8}.${i & 255}`));
    const res = await POST(req(QUESTION, "9.9.9.9"));
    expect(res.status).toBe(429);
    expect((await res.json()).error.code).toBe("DAILY_LIMIT");
  });

  it("returns 503 when Gemini fails before streaming", async () => {
    generateContentStream.mockRejectedValue(new Error("quota"));
    expect((await POST(req(QUESTION))).status).toBe(503);
  });

  it("returns 503 when not configured", async () => {
    configured = false;
    expect((await POST(req(QUESTION))).status).toBe(503);
  });
});
