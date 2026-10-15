// Rebuilds the Ask Dharma knowledge base: `npm run index-content`.
// Reads .env.local for GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import { reindex } from "@/lib/ai/reindex";

config({ path: ".env.local" });

const { GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!GEMINI_API_KEY || !NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const db = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

reindex(ai, db)
  .then((r) => {
    console.log(`Indexed ${r.chunks} chunks from ${r.sources} sources.`);
    if (r.removedSources.length) console.log(`Removed stale sources: ${r.removedSources.join(", ")}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
