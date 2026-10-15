/** Rough token estimate (~4 chars/token for English). Good enough for sizing chunks. */
export const estimateTokens = (text: string) => Math.ceil(text.length / 4);

export interface ChunkOptions {
  maxTokens?: number;
  overlapTokens?: number;
}

/** Greedily packs `units` (sentences or words, with trailing whitespace) into pieces ≤ maxChars. */
function pack(units: string[], maxChars: number): string[] {
  const pieces: string[] = [];
  let buf = "";
  for (const u of units) {
    if (buf && buf.length + u.length > maxChars) {
      pieces.push(buf.trim());
      buf = "";
    }
    // A single word longer than a chunk is the only case that still gets hard-cut.
    if (u.length > maxChars) {
      for (let i = 0; i < u.length; i += maxChars) pieces.push(u.slice(i, i + maxChars).trim());
      continue;
    }
    buf += u;
  }
  if (buf.trim()) pieces.push(buf.trim());
  return pieces;
}

/** Splits text that's too long for one chunk at sentence, then word, boundaries. */
function splitLong(text: string, maxChars: number): string[] {
  const sentences = text.match(/[^.!?\n]+[.!?]*\s*/g) ?? [text];
  const units = sentences.flatMap((s) => (s.length > maxChars ? (s.match(/\S+\s*/g) ?? [s]) : [s]));
  return pack(units, maxChars);
}

/** Last ~`chars` characters of `text`, starting on a word boundary. */
function tail(text: string, chars: number): string {
  if (text.length <= chars) return text;
  const slice = text.slice(-chars);
  const space = slice.indexOf(" ");
  return space === -1 ? slice : slice.slice(space + 1);
}

/**
 * Packs paragraphs into chunks of ≤ maxTokens (default 500), carrying ~overlapTokens
 * (default 50) of the previous chunk's tail into the next for context continuity.
 */
export function chunkText(text: string, { maxTokens = 500, overlapTokens = 50 }: ChunkOptions = {}): string[] {
  const maxChars = maxTokens * 4;
  const overlapChars = overlapTokens * 4;
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap((p) => (p.length > maxChars - overlapChars ? splitLong(p, maxChars - overlapChars) : [p]));

  const chunks: string[] = [];
  let current = "";
  for (const p of paragraphs) {
    const candidate = current ? `${current}\n\n${p}` : p;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }
    chunks.push(current);
    // -2 leaves room for the paragraph separator so the chunk stays ≤ maxChars.
    current = `${tail(current, overlapChars - 2)}\n\n${p}`;
  }
  if (current) chunks.push(current);
  return chunks;
}
