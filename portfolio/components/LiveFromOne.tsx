"use client";

import { useEffect, useState } from "react";
import { ago, parseOneStats, type OneStats } from "@/lib/oneStats";

const ONE_URL = process.env.NEXT_PUBLIC_ONE_URL?.replace(/\/$/, "") ?? "";

/**
 * Live from ONE: a few stat chips + "updated 3 min ago" + a 12-week mini grid.
 * Data comes from ONE's public endpoint, which only exposes stats switched on in ONE.
 * Fails silently: if ONE is down, unset or returns nothing, the widget renders nothing.
 */
export default function LiveFromOne() {
  const [stats, setStats] = useState<OneStats | null>(null);

  useEffect(() => {
    if (!ONE_URL) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    fetch(`${ONE_URL}/api/public-stats`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => setStats(parseOneStats(body)))
      .catch(() => setStats(null))
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (!stats) return null;
  const updated = ago(stats.updatedAt);

  return (
    <div className="mt-10" aria-label="Live progress from ONE">
      <h3 className="mb-3 font-mono text-[13px] text-muted">
        live from ONE
        {updated ? <span> · updated {updated}</span> : null}
      </h3>
      {stats.focus ? <p className="mb-3 text-[15px]">{stats.focus}</p> : null}
      {stats.chips.length ? (
        <ul className="flex flex-wrap gap-2">
          {stats.chips.map((c) => (
            <li key={c.key} className="rounded-md border border-subtle bg-surface px-3 py-1.5 text-[14px]">
              <span className="font-mono text-fg">{c.value}</span> <span className="text-muted">{c.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {stats.grid.length ? (
        <div
          className="mt-4 grid w-max grid-flow-col grid-rows-7 gap-[3px]"
          role="img"
          aria-label={`${stats.grid.filter((l) => l > 0).length} active days in the last ${stats.grid.length} days`}
        >
          {stats.grid.map((l, i) => (
            <span
              key={i}
              className="block h-[9px] w-[9px] rounded-[2px]"
              style={{ backgroundColor: l === 0 ? "rgb(var(--subtle))" : `rgb(var(--accent) / ${0.25 + l * 0.18})` }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
