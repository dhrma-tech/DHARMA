import type { GoogleGenAI } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import { embedQuery } from "@/lib/ai/embed";
import type { ContextChunk } from "@/lib/ai/prompt";

export const MATCH_COUNT = 5;

export interface MatchedChunk extends ContextChunk {
  similarity: number;
}

/** Embeds the question and returns the top-k chunks by cosine similarity. */
export async function retrieve(ai: GoogleGenAI, db: SupabaseClient, question: string, k = MATCH_COUNT): Promise<MatchedChunk[]> {
  const embedding = await embedQuery(ai, question);
  const { data, error } = await db.rpc("match_chunks", { query_embedding: embedding, match_count: k });
  if (error) throw new Error(`match_chunks: ${error.message}`);
  return (data ?? []) as MatchedChunk[];
}
