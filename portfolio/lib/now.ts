import "server-only";
import { now as fallbackNow } from "@/data/now";
import { site } from "@/data/site";
import { logError } from "@/lib/log";
import { getSupabasePublic } from "@/lib/supabase/client";
import type { Now } from "@/types/content";

export interface NowData extends Now {
  /** Hero availability badge; null hides it. */
  availability: string | null;
}

const FALLBACK: NowData = { ...fallbackNow, availability: site.availability };

/**
 * `site_settings.open_to_work`: "false"/"no"/"" hides the badge, "true"/"yes" shows the
 * default label from data/site, anything else is used as the label itself.
 */
export function parseAvailability(value: string | undefined): string | null {
  if (value === undefined) return site.availability;
  const v = value.trim();
  if (/^(false|no|0|off)?$/i.test(v)) return null;
  if (/^(true|yes|1|on)$/i.test(v)) return site.availability;
  return v;
}

/** Now section + hero status from Supabase (cached 5 min), falling back to data/now.ts. */
export async function getNowData(): Promise<NowData> {
  const db = getSupabasePublic();
  if (!db) return FALLBACK;
  try {
    const [items, settings] = await Promise.all([
      db.from("now_items").select("text, updated_at").eq("active", true).order("position"),
      db.from("site_settings").select("key, value, updated_at"),
    ]);
    if (items.error) throw new Error(items.error.message);
    if (settings.error) throw new Error(settings.error.message);
    if (items.data.length === 0) return FALLBACK;

    const map = new Map(settings.data.map((s) => [s.key as string, s.value as string]));
    const updated = [...items.data, ...settings.data]
      .map((row) => row.updated_at as string)
      .sort()
      .at(-1)!
      .slice(0, 10);

    return {
      building: map.get("now_building")?.trim() || fallbackNow.building,
      items: items.data.map((row) => row.text as string),
      updated,
      availability: parseAvailability(map.get("open_to_work")),
    };
  } catch (err) {
    logError("lib/now", "FETCH", err);
    return FALLBACK;
  }
}
