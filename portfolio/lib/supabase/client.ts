import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Seconds that public reads (Now section, settings) stay in Next's data cache. */
export const PUBLIC_REVALIDATE = 300;
export const PUBLIC_CACHE_TAG = "supabase-public";

let anon: SupabaseClient | null | undefined;

/**
 * Anon client for public, RLS-guarded reads. Safe anywhere (the anon key is public).
 * On the server its fetches are cached for PUBLIC_REVALIDATE seconds and tagged so
 * /api/revalidate can purge them. Returns null when Supabase isn't configured.
 */
export function getSupabasePublic(): SupabaseClient | null {
  if (anon !== undefined) return anon;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  anon = url && key
    ? createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: (input, init) =>
            fetch(input, { ...init, next: { revalidate: PUBLIC_REVALIDATE, tags: [PUBLIC_CACHE_TAG] } }),
        },
      })
    : null;
  return anon;
}
