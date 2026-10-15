import type { StackGroup } from "@/types/content";

export const stack: StackGroup[] = [
  { label: "Build", items: ["Claude Code", "Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "Electron"] },
  { label: "AI", items: ["Claude API", "Gemini API", "Google AI SDK", "Ollama", "MCP", "RAG", "Agents"] },
  { label: "Data & Ship", items: ["Supabase", "PostgreSQL", "Prisma", "SQLite", "Vitest", "Vercel", "Git/GitHub"] },
  { label: "Learning", items: ["Python"] },
];

// Original skill lists, preserved until the Phase 3 Stack redesign decides where they go.
export const legacySkills = {
  domain: ["AI Workflow Design", "AI-Assisted Development", "Product Design", "Product Engineering", "System Architecture", "Entrepreneurship", "Event Management", "Community Management", "Startups"],
  languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"],
  tools: ["Claude Code", "Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Supabase", "PostgreSQL", "Google AI SDK", "Gemini API", "Vercel", "Git", "GitHub"],
};
