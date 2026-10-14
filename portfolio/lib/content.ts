import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFrontmatter, Project, ProjectFrontmatter } from "@/types/content";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const WRITING_DIR = path.join(process.cwd(), "content", "writing");

const REQUIRED_POST: (keyof PostFrontmatter)[] = ["title", "date", "summary"];

const REQUIRED: (keyof ProjectFrontmatter)[] = [
  "title", "summary", "description", "year", "dates", "status", "stack", "category", "featured", "order",
];

function readMdx(dir: string, slug: string) {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
  return matter(raw);
}

function slugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function toProject(slug: string, data: Record<string, unknown>): Project {
  const missing = REQUIRED.filter((key) => data[key] === undefined);
  if (missing.length > 0) {
    throw new Error(`content/projects/${slug}.mdx is missing frontmatter: ${missing.join(", ")}`);
  }
  return { slug, ...(data as unknown as ProjectFrontmatter) };
}

/** All projects, sorted by `order`. */
export function getAllProjects(): Project[] {
  return slugsIn(PROJECTS_DIR)
    .map((slug) => toProject(slug, readMdx(PROJECTS_DIR, slug).data))
    .sort((a, b) => a.order - b.order);
}

/** A single project with its MDX body, or null if the slug doesn't exist. */
export function getProject(slug: string): { project: Project; body: string } | null {
  if (!slugsIn(PROJECTS_DIR).includes(slug)) return null;
  const { data, content } = readMdx(PROJECTS_DIR, slug);
  return { project: toProject(slug, data), body: content };
}

function toPost(slug: string, data: Record<string, unknown>): Post {
  const missing = REQUIRED_POST.filter((key) => data[key] === undefined);
  if (missing.length > 0) {
    throw new Error(`content/writing/${slug}.mdx is missing frontmatter: ${missing.join(", ")}`);
  }
  // YAML parses bare dates into Date objects; normalise to ISO yyyy-mm-dd.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return { slug, ...(data as unknown as PostFrontmatter), date };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return slugsIn(WRITING_DIR)
    .map((slug) => toPost(slug, readMdx(WRITING_DIR, slug).data))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): { post: Post; body: string } | null {
  if (!slugsIn(WRITING_DIR).includes(slug)) return null;
  const { data, content } = readMdx(WRITING_DIR, slug);
  return { post: toPost(slug, data), body: content };
}
