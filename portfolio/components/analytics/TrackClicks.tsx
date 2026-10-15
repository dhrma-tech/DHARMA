"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Literal paths (not data/site) keep the site copy out of the client bundle.
const RESUME_PATHS = new Set(["/resume", "/Profile.pdf"]);

/** Maps a clicked link to a custom event name, or null if it isn't one we track. */
export function eventForHref(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (RESUME_PATHS.has(url.pathname)) return "resume_download";
  const project = url.pathname.match(/^\/projects\/([a-z0-9-]+)\/?$/);
  return project ? `project_open:${project[1]}` : null;
}

/**
 * One delegated listener for link-click events (resume downloads, project opens),
 * so server components don't need client wrappers just to be tracked.
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const event = eventForHref(link.getAttribute("href")!);
      if (event) track(event);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
