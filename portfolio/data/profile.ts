export interface WorkItem {
  company: string;
  role: string;
  dates: string;
  description: string;
  letter: string;
}

export interface Project {
  name: string;
  role: string;
  dates: string;
  description: string;
  letter: string;
  url?: string;
  private?: boolean;
  category: "AI" | "Web";
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url: string;
  logo?: string;
}

const work: WorkItem[] = [
  {
    company: "Innovation and Startup Cell",
    role: "Web Design & Development Head",
    dates: "May 2026 - Present",
    description: "Designed and built the complete full-stack website for the Innovation & Startup Cell, including frontend, backend, responsive UI, and core website functionality. Currently leading web design and development, managing website updates, digital presence, and technical support for events, programs, and startup-related activities.",
    letter: "I",
  },
  {
    company: "Innovation and Startup Cell",
    role: "Technical Team Member",
    dates: "Nov 2025 - May 2026",
    description: "Supported ISC's website, digital systems, and event tech.",
    letter: "I",
  },
  {
    company: "Innovex - LSPGCOER",
    role: "Member",
    dates: "Aug 2026 - Present",
    description: "Member of Innovex, the college's Entrepreneurship Cell, built and run as part of NEC (National Entrepreneurship Challenge) — a national program guiding colleges to develop a functioning E-Cell through structured tasks and activities.",
    letter: "I",
  },
  {
    company: "Team Gladiator",
    role: "Powertrain Team Leader",
    dates: "Nov 2025 - Present",
    description: "Leading the powertrain team for Team Gladiator's ATVC project. Also building and maintaining the team's website, currently in progress.",
    letter: "T",
  },
  {
    company: "Mechatronix Students Association",
    role: "Design Team Member",
    dates: "Sep 2025 - Present",
    description: "Creating clean, engaging visuals for events, social media, and student activities while supporting the team with creative design ideas and consistent branding.",
    letter: "M",
  },
  {
    company: "Jawahar Navodaya Vidyalaya",
    role: "School Captain",
    dates: "Jun 2022 - Apr 2023",
    description: "Led student activities, coordinated with teachers and students, managed school events, and represented the student body.",
    letter: "J",
  },
];

const projects: Project[] = [
  {
    name: "DStack",
    role: "TypeScript",
    dates: "May 2026 - Present",
    description: "A CLI-native, API-first workflow orchestration system that turns a rough product idea into a structured AI-assisted build pipeline: planning, architecture, implementation, refinement, and deployment. Built as a pnpm TypeScript monorepo, Gemini-backed with an offline \"fake provider\" mode so it runs without an API key. Tested with Vitest.",
    letter: "D",
    url: "https://github.com/dhrma-tech/DSTACK",
    category: "AI",
  },
  {
    name: "STEVE",
    role: "TypeScript",
    dates: "May 2026 - Present",
    description: "Multi-AI agent orchestration platform: eight always-on AI departments (Engineering, Marketing, Sales, Design, Support, Ops, Finance, Legal) pick up the real work of building a startup while the founder reviews and approves. A real tool-use LLM loop with 14 tool modules across GitHub, Vercel, Supabase, and Stripe, multi-agent delegation, human-approval gates, and persistent per-agent memory, streamed live. Built on Next.js 16, React 19, Prisma 7, and 94 API routes.",
    letter: "S",
    url: "https://github.com/dhrma-tech/STEVE",
    category: "AI",
  },
  {
    name: "Vexor.AI",
    role: "JavaScript",
    dates: "Sep 2025 - Oct 2025",
    description: "An interactive web platform that acts as a sparring partner for your code. Paste in your functions, and the AI generates a comprehensive test suite to challenge your logic and surface edge cases. A huge learning win in backend sandboxing, API handling, and deployment.",
    letter: "V",
    url: "https://github.com/dhrma-tech/Vexor.AI",
    category: "AI",
  },
  {
    name: "Career Copilot",
    role: "CSS",
    dates: "Sep 2025 - Oct 2025",
    description: "A personalized, AI-powered website that guides students through their career and education journey using the Google Gemini API: a custom career roadmap, relevant course recommendations, and a task management system to track goals.",
    letter: "C",
    url: "https://github.com/dhrma-tech/career_copilot",
    category: "AI",
  },
  {
    name: "InnovationAndStartupCell",
    role: "TypeScript",
    dates: "2026",
    description: "Complete full-stack website for the Innovation & Startup Cell of Government College of Engineering Ratnagiri.",
    letter: "I",
    private: true,
    category: "Web",
  },
  {
    name: "CounselPro",
    role: "TypeScript",
    dates: "2026",
    description: "CounselPro is a student counseling and admission guidance platform built to help colleges manage student inquiries, counselor workflows, and admission records.",
    letter: "C",
    url: "https://github.com/dhrma-tech/CounselPro",
    category: "Web",
  },
  {
    name: "ScanRoll",
    role: "TypeScript",
    dates: "Apr 2026 - Present",
    description: "Open-source QR Code Attendance System for colleges with student, teacher, HOD, and admin roles, Supabase backend, QR validation, attendance records, and reports.",
    letter: "S",
    url: "https://github.com/dhrma-tech/ScanRoll",
    category: "Web",
  },
  {
    name: "GladiatorRacing",
    role: "HTML",
    dates: "2025",
    description: "We are Team Gladiator, a dedicated cohort of engineers from the LSP Government College of Engineering, Ratnagiri. Our mission is to design, fabricate, and conquer the Aravalli Terrain Vehicle Championship.",
    letter: "G",
    private: true,
    category: "Web",
  },
];

const certifications: Certification[] = [
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    date: "May 2026",
    url: "https://verify.skilljar.com/c/8zdpaj3qvtdy",
    logo: "/logos/anthropic.png",
  },
  {
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    date: "Jun 2026",
    url: "https://www.coursera.org/account/accomplishments/verify/ECF4C6I0DOGV",
    logo: "/logos/michigan.png",
  },
];

export const profile = {
  name: "Dharmaraj Sunil Aparadh",
  tagline: "Building AI products at the intersection of hardware and intelligence",
  role: "AI Product Engineer",
  availability: "Open to internships",
  bio: "I'm a Mechatronics Engineering student (Government College of Engineering) working toward becoming an AI Product Engineer. I build with Claude Code and Codex, vibe coding ideas into working products fast instead of waiting to master every layer of the stack first. Mechatronics means I think in real systems, not just code. Most people building \"AI products\" only understand the software side — I'm betting on understanding both the machines and the intelligence layered on top of them.",
  location: "Maharashtra, India",
  focus: "AI + Mechatronics",
  yearsExperience: 1,
  email: "aparadhdharmaraj@gmail.com",
  github: "https://github.com/dhrma-tech",
  linkedin: "https://www.linkedin.com/in/dharma-a-921432260/",
  twitter: "https://x.com/dhrma_x",
  work,
  projects,
  skills: {
    domain: ["AI Workflow Design", "AI-Assisted Development", "Product Design", "Product Engineering", "System Architecture", "Entrepreneurship", "Event Management", "Community Management", "Startups"],
    languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"],
    tools: ["Claude Code", "Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Supabase", "PostgreSQL", "Google AI SDK", "Gemini API", "Vercel", "Git", "GitHub"],
  },
  certifications,
};
