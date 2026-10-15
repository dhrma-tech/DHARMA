"use client";

import { useEffect, useState } from "react";

/** Counts below this are hidden — a "3 views" badge is worse than none. */
const MIN_VISIBLE = 10;

function storage(key: string, set?: boolean): boolean {
  try {
    if (set) sessionStorage.setItem(key, "1");
    return Boolean(sessionStorage.getItem(key));
  } catch {
    // Storage blocked (private mode etc.): the server-side limiter still dedupes.
    return false;
  }
}

/** Increments once per session per slug, then shows ` · 1,204 views`. Renders nothing until known. */
export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    const controller = new AbortController();
    const method = storage(key) ? "GET" : "POST";
    fetch(`/api/views/${slug}`, { method, signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (typeof body?.views !== "number") return;
        if (method === "POST") storage(key, true);
        setViews(body.views);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [slug]);

  if (views === null || views < MIN_VISIBLE) return null;
  return <span> · {views.toLocaleString("en-US")} views</span>;
}
