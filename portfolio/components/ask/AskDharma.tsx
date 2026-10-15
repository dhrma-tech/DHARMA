"use client";

import { useRef, useState, type FormEvent } from "react";
import { SOURCES_HEADER, STARTER_QUESTIONS, isRefusal } from "@/lib/ai/constants";
import { PREFILL_EVENT, type PrefillDetail } from "@/components/contact/prefill";

type State =
  | { status: "idle" }
  | { status: "loading"; question: string }
  | { status: "streaming" | "done"; question: string; answer: string; sources: string[] }
  | { status: "error"; question: string; message: string };

function readSources(res: Response): string[] {
  try {
    const raw = res.headers.get(SOURCES_HEADER);
    const parsed = raw ? JSON.parse(decodeURIComponent(raw)) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function handOffToContact(question: string) {
  const detail: PrefillDetail = { message: `Hi Dharma — I asked your site: "${question}"\n\n`, source: "ask-dharma-handoff" };
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function AskDharma() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [input, setInput] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function ask(question: string) {
    const q = question.trim();
    if (q.length < 3) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setInput(q);
    setState({ status: "loading", question: q });

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null);
        setState({ status: "error", question: q, message: body?.error?.message ?? "Something went wrong — try again." });
        return;
      }
      const sources = readSources(res);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setState({ status: "streaming", question: q, answer, sources });
      }
      setState({ status: "done", question: q, answer, sources });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setState({ status: "error", question: q, message: "Network error — check your connection and try again." });
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const busy = state.status === "loading" || state.status === "streaming";
  const refused = state.status === "done" && isRefusal(state.answer);

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <label htmlFor="ask-input" className="sr-only">
          Ask anything about Dharma&apos;s work
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about my work"
          maxLength={300}
          autoComplete="off"
          className="min-w-0 flex-1 rounded border border-subtle bg-surface px-3 py-2 text-[15px] text-fg placeholder:text-muted focus:border-fg focus:outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={busy || input.trim().length < 3}
          className="shrink-0 rounded bg-fg px-4 py-2 text-[15px] font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {busy ? "…" : "Ask"}
        </button>
      </form>

      {state.status === "idle" && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Suggested questions">
          {STARTER_QUESTIONS.map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-subtle px-3 py-1 text-[13px] text-muted transition-colors hover:border-fg hover:text-fg"
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" aria-busy={busy} className="mt-4 text-[15px]">
        {state.status === "loading" && <p className="text-muted">Thinking…</p>}
        {state.status === "error" && <p className="text-fg">{state.message}</p>}
        {(state.status === "streaming" || state.status === "done") && (
          <>
            <p className="whitespace-pre-line text-fg">{state.answer}</p>
            {state.status === "done" && !refused && state.sources.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[12px] text-muted" aria-label="Sources">
                {state.sources.map((s) => (
                  <li key={s} className="rounded bg-surface px-2 py-0.5 ring-1 ring-subtle">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {(refused || state.status === "error") && (
          <button
            type="button"
            onClick={() => handOffToContact(state.question)}
            className="mt-3 text-[15px] text-fg underline decoration-accent decoration-2 underline-offset-4"
          >
            Ask Dharma directly →
          </button>
        )}
      </div>
      <p className="mt-4 font-mono text-[12px] text-muted">
        AI answers from this site&apos;s content. It can be wrong — the case studies are the source of truth.
      </p>
    </div>
  );
}
