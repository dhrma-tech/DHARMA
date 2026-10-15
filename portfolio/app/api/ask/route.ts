import { CHAT_MODEL, getGenAI } from "@/lib/ai/gemini";
import { SOURCES_HEADER, isRefusal } from "@/lib/ai/constants";
import { SYSTEM_PROMPT, buildUserPrompt, sourceLinks } from "@/lib/ai/prompt";
import { retrieve } from "@/lib/ai/retrieve";
import { getClientIp, hashIp, isSameOrigin, jsonError, parseJson, retryAfter } from "@/lib/http";
import { logError } from "@/lib/log";
import { RULES, rateLimit } from "@/lib/ratelimit";
import { askSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const ROUTE = "api/ask";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return jsonError(403, "FORBIDDEN", "Cross-origin requests are not allowed.");

  const parsed = await parseJson(req, askSchema, 2 * 1024);
  if (!parsed.ok) return parsed.response;
  const { question } = parsed.data;

  const ipHash = hashIp(getClientIp(req));
  const perIp = await rateLimit(RULES.askIp, ipHash);
  if (!perIp.success) {
    return jsonError(429, "RATE_LIMITED", "You've asked a lot this hour — try again later, or email Dharma.", retryAfter(perIp.reset));
  }
  const global = await rateLimit(RULES.askGlobal, "all");
  if (!global.success) {
    return jsonError(429, "DAILY_LIMIT", "Daily limit reached — the assistant is back tomorrow. You can still email Dharma.", retryAfter(global.reset));
  }

  const ai = getGenAI();
  const db = getSupabaseAdmin();
  if (!ai || !db) {
    logError(ROUTE, "NOT_CONFIGURED");
    return jsonError(503, "UNAVAILABLE", "The assistant is offline right now — email Dharma instead.");
  }

  let chunks;
  let stream: AsyncGenerator<{ text?: string }>;
  try {
    chunks = await retrieve(ai, db, question);
    stream = await ai.models.generateContentStream({
      model: CHAT_MODEL,
      contents: [{ role: "user", parts: [{ text: buildUserPrompt(question, chunks) }] }],
      config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.2, maxOutputTokens: 1024 },
    });
  } catch (err) {
    logError(ROUTE, "GEMINI", err);
    return jsonError(503, "UNAVAILABLE", "The assistant is having trouble — try again in a moment.");
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      try {
        for await (const chunk of stream) {
          const text = chunk.text;
          if (!text) continue;
          answer += text;
          controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        logError(ROUTE, "STREAM", err);
        controller.enqueue(encoder.encode("\n\n(The answer was cut off — please try again.)"));
        answer = "";
      }
      // Only the question and an anonymised IP are kept.
      const { error } = await db.from("ai_queries").insert({
        question,
        answered: answer.length > 0 && !isRefusal(answer),
        ip_hash: ipHash,
      });
      if (error) logError(ROUTE, "LOG_QUERY", error.message);
      controller.close();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      [SOURCES_HEADER]: encodeURIComponent(JSON.stringify(sourceLinks(chunks))),
    },
  });
}
