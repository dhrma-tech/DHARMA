import type { Site } from "@/types/content";

export const site: Site = {
  name: "Dharmaraj Sunil Aparadh",
  shortName: "Dharmaraj Aparadh",
  role: "AI Product Engineer",
  tagline: "Building AI products at the intersection of hardware and intelligence",
  positioning:
    "AI Product Engineer & Mechatronics student. Building AI products at the intersection of hardware and intelligence.",
  bio: "I'm a Mechatronics Engineering student (Government College of Engineering) working toward becoming an AI Product Engineer. I build with Claude Code and Codex, vibe coding ideas into working products fast instead of waiting to master every layer of the stack first. Mechatronics means I think in real systems, not just code. Most people building \"AI products\" only understand the software side — I'm betting on understanding both the machines and the intelligence layered on top of them.",
  about:
    "I'm a Mechatronics Engineering student working toward becoming an AI Product Engineer. I build with Claude Code and Codex, turning ideas into working products fast instead of waiting to master every layer first. Mechatronics means I think in real systems, not just code — I'm betting on understanding both the machines and the intelligence layered on top of them.",
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
