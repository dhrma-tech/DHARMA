import { describe, expect, it } from "vitest";
import { chunkText } from "@/lib/ai/chunk";
import { cleanMdx, buildSourceDocs } from "@/lib/ai/sources";

const para = (n: number, word = "word") => Array.from({ length: n }, () => word).join(" ") + ".";

describe("chunkText", () => {
  it("keeps short text as one chunk", () => {
    expect(chunkText("Hello.\n\nWorld.")).toEqual(["Hello.\n\nWorld."]);
  });

  it("splits long text into chunks within the size cap, with overlap", () => {
    const text = Array.from({ length: 12 }, (_, i) => para(60, `w${i}`)).join("\n\n");
    const chunks = chunkText(text, { maxTokens: 200, overlapTokens: 20 });
    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) expect(c.length).toBeLessThanOrEqual(800);
    // Each chunk after the first starts with the tail of the previous one.
    for (let i = 1; i < chunks.length; i++) {
      const firstWord = chunks[i].split(/\s/)[0];
      expect(chunks[i - 1]).toContain(firstWord);
    }
  });

  it("splits a single oversized paragraph", () => {
    const chunks = chunkText(para(2000), { maxTokens: 100, overlapTokens: 10 });
    expect(chunks.length).toBeGreaterThan(5);
    for (const c of chunks) expect(c.length).toBeLessThanOrEqual(400);
  });

  it("drops nothing: every word survives chunking", () => {
    const words = Array.from({ length: 900 }, (_, i) => `t${i}`);
    const chunks = chunkText(words.join(" ") + ".", { maxTokens: 100, overlapTokens: 10 });
    const joined = chunks.join(" ");
    for (const w of words) expect(joined).toMatch(new RegExp(`\\b${w}\\b`));
  });
});

describe("cleanMdx", () => {
  it("removes Todo notes and JSX but keeps markdown", () => {
    const out = cleanMdx('## Problem\n\nReal text.\n\n<Todo>Write this\nlater</Todo>\n\n<Figure src="/a.png" alt="x" />\n\n- point');
    expect(out).toBe("## Problem\n\nReal text.\n\n- point");
  });
});

describe("buildSourceDocs", () => {
  it("covers site data and every project, without Todo text", () => {
    const docs = buildSourceDocs();
    const sources = docs.map((d) => d.source);
    expect(sources).toEqual(expect.arrayContaining(["about", "now", "experience", "stack", "project:dstack"]));
    for (const d of docs) expect(d.text).not.toMatch(/<Todo>/);
    expect(docs.find((d) => d.source === "project:dstack")?.title).toBe("DStack");
  });
});
