// "Live from ONE": parse ONE's public stats endpoint (GET <ONE>/api/public-stats → { v: 1, updated_at, stats }).
// ONE only returns stats Dharma switched on, so everything here is optional. Unknown keys are ignored.

export interface OneChip {
  key: string;
  value: string;
  label: string;
}

export interface OneStats {
  updatedAt: string | null;
  chips: OneChip[];
  focus: string | null;
  grid: number[]; // 0-4 levels, oldest first (up to 84 days)
}

const n = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const plural = (v: number, one: string, many: string) => (v === 1 ? one : many);

const FORMAT: Record<string, (v: number) => [string, string]> = {
  lock_in_day: (v) => [`Day ${v}`, "of the lock-in"],
  overall_streak: (v) => [`${v}`, "day streak"],
  level: (v) => [`Lv ${v}`, "overall level"],
  python_hours_week: (v) => [`${v}h`, "Python this week"],
  github_pushes_week: (v) => [`${v}`, plural(v, "push this week", "pushes this week")],
  chess_rapid: (v) => [`${v}`, "Chess.com rapid"],
  posts_month: (v) => [`${v}`, plural(v, "post this month", "posts this month")],
  books_finished: (v) => [`${v}`, plural(v, "book finished", "books finished")],
  workouts_month: (v) => [`${v}`, plural(v, "workout this month", "workouts this month")],
};

export function parseOneStats(body: unknown): OneStats | null {
  const b = body as { v?: number; updated_at?: string; stats?: Record<string, unknown> } | null;
  if (!b || b.v !== 1 || !b.stats || typeof b.stats !== "object") return null;
  const chips: OneChip[] = [];
  for (const [key, fmt] of Object.entries(FORMAT)) {
    const v = n(b.stats[key]);
    if (v === null) continue;
    const [value, label] = fmt(v);
    chips.push({ key, value, label });
  }
  const f = b.stats.current_focus;
  const focus = typeof f === "string" && f.trim() ? f.trim().slice(0, 80) : null;
  const g = b.stats.grid;
  const grid = typeof g === "string" && /^[0-4]{1,84}$/.test(g) ? Array.from(g, Number) : [];
  if (!chips.length && !focus && !grid.length) return null;
  return { updatedAt: typeof b.updated_at === "string" ? b.updated_at : null, chips, focus, grid };
}

export function ago(iso: string | null, now = Date.now()): string | null {
  if (!iso) return null;
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (!Number.isFinite(s)) return null;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return `${Math.floor(s / 86400)} d ago`;
}
