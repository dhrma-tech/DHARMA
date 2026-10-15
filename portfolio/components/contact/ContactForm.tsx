"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { clsx as cn } from "clsx";
import { PREFILL_EVENT, type PrefillDetail } from "@/components/contact/prefill";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const FIELD =
  "mt-1 block w-full rounded border border-subtle bg-surface px-3 py-2 text-[15px] text-fg placeholder:text-muted focus:border-fg focus:outline-none focus-visible:outline-none";
const LABEL = "block font-mono text-[13px] text-muted";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [prefill, setPrefill] = useState<PrefillDetail | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      setStatus({ state: "idle" });
      setPrefill((e as CustomEvent<PrefillDetail>).detail);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    const el = messageRef.current;
    if (!prefill || !el) return;
    el.focus({ preventScroll: true });
    el.setSelectionRange(el.value.length, el.value.length);
  }, [prefill]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setPrefill(null);
        setStatus({ state: "sent" });
        return;
      }
      const body = await res.json().catch(() => null);
      setStatus({ state: "error", message: body?.error?.message ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "Network error — check your connection and try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <p role="status" className="mt-8 text-[15px] text-fg">
        Sent. I&apos;ll reply within 48 hours.{" "}
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="text-muted decoration-accent decoration-2 underline-offset-4 hover:text-fg hover:underline"
        >
          Send another
        </button>
      </p>
    );
  }

  const sending = status.state === "sending";
  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={LABEL}>
          name
          <input name="name" required maxLength={100} autoComplete="name" className={FIELD} />
        </label>
        <label className={LABEL}>
          email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={FIELD} />
        </label>
      </div>
      <label className={LABEL}>
        message
        <textarea
          ref={messageRef}
          key={prefill?.message}
          defaultValue={prefill?.message}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          className={cn(FIELD, "resize-y")}
        />
      </label>
      <input type="hidden" name="source" value={prefill?.source ?? "contact-form"} />
      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="rounded bg-fg px-4 py-2 text-[15px] font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {sending ? "Sending…" : status.state === "error" ? "Retry" : "Send message"}
        </button>
        <p aria-live="polite" className="text-[14px] text-muted">
          {status.state === "error" && <span className="text-fg">{status.message}</span>}
        </p>
      </div>
    </form>
  );
}
