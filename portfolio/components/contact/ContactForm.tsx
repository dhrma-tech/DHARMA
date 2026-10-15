"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { clsx as cn } from "clsx";
import { track } from "@vercel/analytics";
import { site } from "@/data/site";
import { PREFILL_EVENT, type PrefillDetail } from "@/components/contact/prefill";

const FIELD =
  "mt-1 block w-full rounded border border-subtle bg-surface px-3 py-2 text-[15px] text-fg placeholder:text-muted focus:border-fg focus:outline-none focus-visible:outline-none";
const LABEL = "block font-mono text-[13px] text-muted";

/** Gmail's web compose window, pre-filled. The visitor sends it from their own account. */
function gmailComposeUrl(name: string, message: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: site.email,
    su: `Portfolio: message from ${name}`,
    body: message,
  });
  return `https://mail.google.com/mail/?${params}`;
}

export default function ContactForm() {
  const [opened, setOpened] = useState(false);
  const [prefill, setPrefill] = useState<PrefillDetail | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      setOpened(false);
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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    window.open(gmailComposeUrl(data.name.trim(), data.message.trim()), "_blank", "noopener,noreferrer");
    track("contact_submit", { source: prefill?.source ?? "contact-form" });
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <label className={LABEL}>
        name
        <input name="name" required maxLength={100} autoComplete="name" className={FIELD} />
      </label>
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
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded bg-fg px-4 py-2 text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
        >
          Open in Gmail
        </button>
        <p aria-live="polite" className="text-[14px] text-muted">
          {opened && "Gmail opened in a new tab. Hit send there and I'll reply within 48 hours."}
        </p>
      </div>
    </form>
  );
}
