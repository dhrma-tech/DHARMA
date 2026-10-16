import type { Now } from "@/types/content";

// Fallback for the Now section when Supabase is unreachable; live copy lives in now_items/site_settings.
export const now: Now = {
  building: "STEVE",
  items: [
    "Building STEVE — eight always-on AI departments that run the work of a startup while the founder approves.",
    "Building Rocky — a local-first AI memory for my work that cites every answer and waits for approval before it writes.",
    "Leading web design and development as head at the Innovation and Startup Cell, GCOE Ratnagiri.",
  ],
  updated: "2026-10-16",
};
