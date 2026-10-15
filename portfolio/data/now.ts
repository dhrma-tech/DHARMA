import type { Now } from "@/types/content";

// Fallback for the Now section when Supabase is unreachable; live copy lives in now_items/site_settings.
export const now: Now = {
  building: "Rocky",
  items: [
    "Building Rocky — a local-first, open-source AI memory for your work that cites every answer and waits for approval before it writes.",
    "Taking DStack to a full release, about a month out.",
    "Pitching VOLTIC, an AI layer for machine and sensor data, at Eureka 2026 (IIT Bombay).",
    "Leading the powertrain team for Team Gladiator's ATVC build.",
  ],
  updated: "2026-10-15",
};
