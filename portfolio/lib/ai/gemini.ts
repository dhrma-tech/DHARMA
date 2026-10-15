import { GoogleGenAI } from "@google/genai";

// Aliases track Google's current Flash-Lite / embedding models; override via env to pin one.
export const CHAT_MODEL = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
export const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL || "gemini-embedding-001";
/** Must match knowledge_chunks.embedding vector(768). */
export const EMBED_DIMENSIONS = 768;

let client: GoogleGenAI | null | undefined;

export function getGenAI(): GoogleGenAI | null {
  if (client === undefined) client = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
  return client;
}
