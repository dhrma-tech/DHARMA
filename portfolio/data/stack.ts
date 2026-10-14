import type { StackGroup } from "@/types/content";

export const stack: StackGroup[] = [
  { label: "Build", items: ["Claude Code", "Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"] },
  { label: "AI", items: ["Gemini API", "Google AI SDK", "Claude API", "RAG", "agents"] },
  { label: "Data & Ship", items: ["Supabase", "PostgreSQL", "Vercel", "Git/GitHub"] },
  { label: "Learning", items: ["Python"] },
];

// Original skill lists, preserved until the Phase 3 Stack redesign decides where they go.
export const legacySkills = {
  domain: ["AI Workflow Design", "AI-Assisted Development", "Product Design", "Product Engineering", "System Architecture", "Entrepreneurship", "Event Management", "Community Management", "Startups"],
  languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"],
  tools: ["Claude Code", "Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Supabase", "PostgreSQL", "Google AI SDK", "Gemini API", "Vercel", "Git", "GitHub"],
};
