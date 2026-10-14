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
  bio: string;
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

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  dates: string;
  year: number;
  language: string;
  category: ProjectCategory;
  featured: boolean;
  repo?: string;
  private?: boolean;
}
