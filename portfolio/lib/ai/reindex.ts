import type { GoogleGenAI } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import { chunkText } from "@/lib/ai/chunk";
import { embedTexts } from "@/lib/ai/embed";
import { buildSourceDocs } from "@/lib/ai/sources";

export interface ReindexResult {
  sources: number;
  chunks: number;
  removedSources: string[];
}

/**
 * Rebuilds knowledge_chunks from data/ + content/. Everything is embedded before
 * any row is touched, so a Gemini failure leaves the old index intact. Each source's
 * rows are replaced, and sources that no longer exist are deleted.
 */
export async function reindex(ai: GoogleGenAI, db: SupabaseClient, root?: string): Promise<ReindexResult> {
  const docs = buildSourceDocs(root);
  const rows = docs.flatMap((doc) =>
    chunkText(doc.text).map((content) => ({ source: doc.source, title: doc.title, content }))
  );

  // Prefix the title so chunks from the middle of a case study still say what they're about.
  const embeddings = await embedTexts(ai, rows.map((r) => `${r.title}\n\n${r.content}`), "RETRIEVAL_DOCUMENT");

  for (const doc of docs) {
    const { error: delError } = await db.from("knowledge_chunks").delete().eq("source", doc.source);
    if (delError) throw new Error(`delete ${doc.source}: ${delError.message}`);
    const payload = rows
      .map((r, i) => ({ ...r, embedding: embeddings[i] }))
      .filter((r) => r.source === doc.source);
    const { error } = await db.from("knowledge_chunks").insert(payload);
    if (error) throw new Error(`insert ${doc.source}: ${error.message}`);
  }

  const { data: existing, error: listError } = await db.from("knowledge_chunks").select("source");
  if (listError) throw new Error(`list sources: ${listError.message}`);
  const current = new Set(docs.map((d) => d.source));
  const stale = Array.from(new Set((existing ?? []).map((r) => r.source as string))).filter((s) => !current.has(s));
  if (stale.length > 0) {
    const { error } = await db.from("knowledge_chunks").delete().in("source", stale);
    if (error) throw new Error(`delete stale: ${error.message}`);
  }

  return { sources: docs.length, chunks: rows.length, removedSources: stale };
}
