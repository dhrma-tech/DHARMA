export interface Socials {
  github: string;
  linkedin: string;
  x: string;
}

export interface Site {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  positioning: string;
  /** Full original bio (used for meta / AI context). */
  bio: string;
  /** Tightened 3–4 line version shown in the About section. */
  about: string;
  availability: string;
  email: string;
  socials: Socials;
  location: string;
  college: string;
  discipline: string;
  focus: string;
  yearsExperience: number;
  resumeUrl: string;
  siteUrl: string;
}

export interface Now {
  building: string;
  items: string[];
  /** ISO date, e.g. "2026-10-14" */
  updated: string;
}

export interface Role {
  title: string;
  dates: string;
  description: string;
}

export interface Experience {
  org: string;
  roles: Role[];
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url: string;
  logo?: string;
}

export type ProjectCategory = "AI" | "Web";
export type ProjectStatus = "In progress" | "Shipped";

/** Frontmatter of content/projects/*.mdx */
export interface ProjectFrontmatter {
  title: string;
  summary: string;
  description: string;
  year: number;
  /** Original date range, e.g. "May 2026 – Present" */
  dates: string;
  status: ProjectStatus;
  stack: string[];
  category: ProjectCategory;
  featured: boolean;
  /** Sort position in the list (ascending). */
  order: number;
  repo?: string;
  live?: string;
  cover?: string;
  private?: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
}

/** Frontmatter of content/writing/*.mdx */
export interface PostFrontmatter {
  title: string;
  /** ISO date, e.g. "2026-10-14" */
  date: string;
  summary: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
}
