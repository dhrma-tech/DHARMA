import type { Now } from "@/types/content";

// Fallback for the Now section when Supabase is unreachable; live copy lives in now_items/site_settings.
// TODO: rewrite these bullets in your own words — they're seeded from project descriptions.
export const now: Now = {
  building: "STEVE",
  items: [
    "Building STEVE — eight always-on AI departments that run the work of a startup while the founder approves.",
    "Shipping DStack, a CLI that turns a rough idea into a structured AI-assisted build pipeline.",
    "Leading the powertrain team for Team Gladiator's ATVC build.",
  ],
  updated: "2026-10-14",
};
