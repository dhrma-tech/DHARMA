import { describe, expect, it } from "vitest";
import { ago, parseOneStats } from "../lib/oneStats";

describe("Live from ONE", () => {
  it("returns null for empty, unknown or broken payloads (widget hides)", () => {
    expect(parseOneStats(null)).toBeNull();
    expect(parseOneStats({ v: 2, stats: { level: 3 } })).toBeNull();
    expect(parseOneStats({ v: 1, stats: {} })).toBeNull();
  });

  it("formats only known numeric stats and validates the grid", () => {
    const s = parseOneStats({
      v: 1,
      updated_at: "2026-12-01T10:00:00Z",
      stats: { lock_in_day: 12, chess_rapid: 812, weight: 52, current_focus: "Learning: Python data structures", grid: "01234" },
    });
    expect(s?.chips.map((c) => c.value)).toEqual(["Day 12", "812"]);
    expect(s?.focus).toBe("Learning: Python data structures");
    expect(s?.grid).toEqual([0, 1, 2, 3, 4]);
    expect(parseOneStats({ v: 1, stats: { level: 2, grid: "9x" } })?.grid).toEqual([]);
  });

  it("says how long ago it updated", () => {
    const now = Date.parse("2026-12-01T10:03:00Z");
    expect(ago("2026-12-01T10:00:00Z", now)).toBe("3 min ago");
    expect(ago(null, now)).toBeNull();
  });
});
