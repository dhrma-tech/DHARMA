// Builds the Ask Dharma knowledge base from data/ and content/. No `server-only`
// here: scripts/index-content.ts imports this from plain Node.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { stack } from "@/data/stack";
import { certifications } from "@/data/certifications";
import { now } from "@/data/now";

export interface SourceDoc {
  /** Stable id, e.g. 'project:dstack'. Re-indexing replaces all chunks for a source. */
  source: string;
  /** Label shown on the source chip. */
  title: string;
  text: string;
}

/** Strips authoring-only MDX: <Todo> notes (they're instructions to me, not facts) and JSX tags. */
export function cleanMdx(body: string): string {
  return body
    .replace(/<Todo>[\s\S]*?<\/Todo>/g, "")
    .replace(/<[A-Z][A-Za-z]*\b[^>]*\/>/g, "")
    .replace(/<\/?[A-Z][A-Za-z]*\b[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readMdxDir(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, ""), ...matter(fs.readFileSync(path.join(dir, f), "utf8")) }));
}

export function buildSourceDocs(root: string = process.cwd()): SourceDoc[] {
  const docs: SourceDoc[] = [
    {
      source: "about",
      title: "About",
      text: [
        `${site.name} (${site.shortName}) — ${site.role}.`,
        site.bio,
        `Based in ${site.location}. Studies ${site.discipline} engineering at ${site.college} (Government College of Engineering, Ratnagiri). Focus: ${site.focus}.`,
        `Availability: ${site.availability}.`,
        `Contact: ${site.email}. GitHub: ${site.socials.github}. LinkedIn: ${site.socials.linkedin}. X: ${site.socials.x}. Resume: ${site.siteUrl}${site.resumeUrl}.`,
      ].join("\n\n"),
    },
    {
      source: "now",
      title: "Now",
      text: `What Dharma is doing now (updated ${now.updated}). Currently building: ${now.building}.\n\n${now.items.map((i) => `- ${i}`).join("\n")}`,
    },
    {
      source: "experience",
      title: "Experience",
      text: experience
        .map((e) => `${e.org}\n${e.roles.map((r) => `- ${r.title} (${r.dates}): ${r.description}`).join("\n")}`)
        .join("\n\n"),
    },
    {
      source: "stack",
      title: "Tech stack",
      text: `Dharma's tech stack:\n${stack.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n")}`,
    },
    {
      source: "certifications",
      title: "Certifications",
      text: `Certifications:\n${certifications.map((c) => `- ${c.name} — ${c.issuer}, ${c.date}`).join("\n")}`,
    },
  ];

  for (const { slug, data, content } of readMdxDir(path.join(root, "content", "projects"))) {
    const meta = [
      `Project: ${data.title} — ${data.summary}.`,
      data.description,
      `Dates: ${data.dates}. Status: ${data.status}. Stack: ${(data.stack ?? []).join(", ")}.`,
      data.repo ? `Source: ${data.repo}` : data.private ? "The repository is private." : "",
      data.live ? `Live: ${data.live}` : "",
      `Case study: ${site.siteUrl}/projects/${slug}`,
    ].filter(Boolean);
    docs.push({ source: `project:${slug}`, title: String(data.title), text: `${meta.join("\n")}\n\n${cleanMdx(content)}` });
  }

  for (const { slug, data, content } of readMdxDir(path.join(root, "content", "writing"))) {
    docs.push({
      source: `post:${slug}`,
      title: String(data.title),
      text: `Post: ${data.title} (${data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date}) — ${data.summary}\n\n${cleanMdx(content)}`,
    });
  }

  return docs;
}
