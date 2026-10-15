import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null | undefined;

/**
 * Service-role client: bypasses RLS. Server code only — never import from a client component.
 * Returns null when Supabase isn't configured so callers can degrade gracefully.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (admin !== undefined) return admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  admin = url && key
    ? createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        // Writes and per-request reads must never hit Next's fetch cache.
        global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
      })
    : null;
  return admin;
}
