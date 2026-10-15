import type { Site } from "@/types/content";

export const site: Site = {
  name: "Dharmaraj Sunil Aparadh",
  shortName: "Dharmaraj Aparadh",
  role: "AI Product Engineer",
  tagline: "Building AI products at the intersection of hardware and intelligence",
  positioning:
    "I’m an AI Product Engineer. I build AI-powered products end to end, from LLM integration and agents to deployed full-stack apps.",
  bio: "I'm a Mechatronics Engineering student (Government College of Engineering) working toward becoming an AI Product Engineer. I build with Claude Code and Codex, vibe coding ideas into working products fast instead of waiting to master every layer of the stack first. Mechatronics means I think in real systems, not just code. Most people building \"AI products\" only understand the software side — I'm betting on understanding both the machines and the intelligence layered on top of them. Goal: to build products that reduce dev time from days to hours, and to get good enough at both hardware and AI that I can build what most AI product builders can't. Currently pitching VOLTIC, an AI layer for machine and sensor data, at Eureka 2026 (IIT Bombay).",
  about:
    "I’m an AI Product Engineer focused on building AI-native products from idea to deployment. My day-to-day work uses Claude Code and Codex to move fast, and I focus on the parts that make AI products useful in practice: LLM integration, prompt design, RAG over real data, agent workflows, and full-stack web apps. I’m building in public, so you’ll see the projects, the decisions behind them, and the lessons I learn along the way. My goal is simple: take an idea from concept to a working, deployed product in hours, not weeks, without cutting corners on how it’s built.",
  availability: "Open to internships",
  email: "aparadhdharmaraj@gmail.com",
  socials: {
    github: "https://github.com/dhrma-tech",
    linkedin: "https://www.linkedin.com/in/dharma-a-921432260/",
    x: "https://x.com/dhrma_x",
  },
  location: "Ratnagiri, Maharashtra",
  college: "GCOE",
  discipline: "Mechatronics",
  focus: "AI + Mechatronics",
  yearsExperience: 1,
  resumeUrl: "/Profile.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dharma-phi.vercel.app",
};
