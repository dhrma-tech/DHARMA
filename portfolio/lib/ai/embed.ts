import type { GoogleGenAI } from "@google/genai";
import { EMBED_DIMENSIONS, EMBED_MODEL } from "@/lib/ai/gemini";

type TaskType = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

/** The API accepts up to 100 inputs per batch. */
const BATCH = 100;

export async function embedTexts(ai: GoogleGenAI, texts: string[], taskType: TaskType): Promise<number[][]> {
  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const res = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: batch,
      config: { taskType, outputDimensionality: EMBED_DIMENSIONS },
    });
    const vectors = res.embeddings?.map((e) => e.values ?? []) ?? [];
    if (vectors.length !== batch.length || vectors.some((v) => v.length !== EMBED_DIMENSIONS)) {
      throw new Error(`Embedding response mismatch: got ${vectors.length} vectors for ${batch.length} inputs`);
    }
    out.push(...vectors);
  }
  return out;
}

export async function embedQuery(ai: GoogleGenAI, text: string): Promise<number[]> {
  const [vector] = await embedTexts(ai, [text], "RETRIEVAL_QUERY");
  return vector;
}
