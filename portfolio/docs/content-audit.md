# Portfolio content audit

Audited 2026-10-15 against the `redesign/v2` branch (commit `951eb6f`) and the live site https://dharma-phi.vercel.app (served from `main`, commit `d9965d9`).
Text is quoted exactly as written. Paths are relative to `portfolio/`.

**Live vs code, in one line:** every piece of content on the live site matches the code word for word. The only differences are the backend features on `redesign/v2` that aren't deployed yet (see [Live site differences](#live-site-differences)).

---

## 1. Site meta

| Item | Value | Source |
|---|---|---|
| `<title>` (home) | `Dharmaraj Sunil Aparadh \| AI Product Engineer` | `app/layout.tsx:35` (built from `site.name` + `site.role`) |
| Title template (subpages) | `%s \| Dharmaraj Sunil Aparadh` | `app/layout.tsx:42` |
| Meta description | `Building AI products at the intersection of hardware and intelligence. AI Product Engineer and Mechatronics Engineering student building AI-native products with Claude Code — portfolio, projects, and work experience.` | `app/layout.tsx:36` (first sentence from `data/site.ts:7`, rest hardcoded) |
| Keywords | `Dharmaraj Sunil Aparadh`, `AI Product Engineer`, `Mechatronics Engineering`, `Claude Code`, `AI-assisted development`, `Full Stack Developer`, `Portfolio` | `app/layout.tsx:45-53` |
| Author / creator | `Dharmaraj Sunil Aparadh` | `app/layout.tsx:54-55` |
| Robots | `index, follow` | `app/layout.tsx:69-72` |
| Canonical (home) | `/` → `https://dharma-phi.vercel.app` | `app/page.tsx:23` |
| Site URL | `https://dharma-phi.vercel.app` (unless `NEXT_PUBLIC_SITE_URL` is set) | `data/site.ts:26` |
| `og:type` | `website` | `app/layout.tsx:57` |
| `og:url` | `/` | `app/layout.tsx:58` |
| `og:title` / `twitter:title` | same as `<title>` | `app/layout.tsx:59,66` |
| `og:description` / `twitter:description` | same as meta description | `app/layout.tsx:60,67` |
| `og:site_name` | `Dharmaraj Sunil Aparadh` | `app/layout.tsx:61` |
| `twitter:card` | `summary_large_image` | `app/layout.tsx:65` |
| OG / Twitter image | Generated 1200×630 PNG. Title `Dharmaraj Aparadh`, subtitle = `site.positioning`, footer `Open to internships` · `dharma-phi.vercel.app`, "DA" monogram | `app/opengraph-image.tsx:10`, `app/twitter-image.tsx:10`, `lib/og.tsx:84,121,123` |
| OG / Twitter image alt | `Dharmaraj Aparadh — AI Product Engineer` | `app/opengraph-image.tsx:5`, `app/twitter-image.tsx:5` |
| Project page OG | `/og?title=<title>&subtitle=<summary>&eyebrow=<year · first 3 stack items>` | `app/projects/[slug]/page.tsx:24-31` |
| Favicon (ICO) | `app/favicon.ico` (25,931 bytes, the **stock create-next-app favicon**) | `app/favicon.ico` |
| Favicon (SVG) | "DA" in `#f5f1e8` on a `#2d241e` rounded square | `app/icon.svg` |
| JSON-LD Person | name `Dharmaraj Sunil Aparadh`; url site URL; image `/profile.jpeg`; jobTitle `AI Product Engineer`; description = tagline; email `mailto:aparadhdharmaraj@gmail.com`; address `Ratnagiri`, `Maharashtra`, `IN`; alumniOf `Government College of Engineering, Ratnagiri`; sameAs GitHub, LinkedIn, X | `app/page.tsx:26-38` |
| Sitemap | home (weekly, 1.0) + every project (monthly; 0.8 featured / 0.5 others) + posts | `app/sitemap.ts:22-26` |
| robots.txt | allow `/`, sitemap `https://dharma-phi.vercel.app/sitemap.xml` | `app/robots.ts:6-10` |
| Skip link | `Skip to content` | `app/layout.tsx:87` |
| 404 page | `404` / `Page not found` / `The page you're looking for doesn't exist or has moved.` / `← back home` | `app/not-found.tsx:6-13` |

## 2. Hero

| Item | Value | Source |
|---|---|---|
| Name (h1) | `Dharmaraj Aparadh` (split into `Dharmaraj` / `Aparadh` around the photo) | `data/site.ts:5`, rendered `components/Hero.tsx:9,61` |
| Photo | `/profile.jpeg`, alt `Portrait of Dharmaraj Aparadh`, grayscale until hover | `components/Hero.tsx:19,41-42` |
| Role / positioning line | `AI Product Engineer & Mechatronics student. Building AI products at the intersection of hardware and intelligence.` | `data/site.ts:9`, rendered `components/Hero.tsx:96` |
| Status label | `Now building` | **hardcoded** `components/Hero.tsx:90` |
| Status value | `STEVE` | `data/now.ts:6` (on `redesign/v2`: Supabase `site_settings.now_building`) |
| Availability badge | `Open to internships` | `data/site.ts:13` (on `redesign/v2`: Supabase `site_settings.open_to_work`) |
| Theme toggle | `Theme: Light` / `Theme: Dark` | `components/ThemeToggle.tsx:16,25` |
| CTAs | **None.** The hero has no buttons or links apart from the theme toggle. | — |

## 3. About

| Item | Value | Source |
|---|---|---|
| Section label | `about` | `components/About.tsx:14` |
| Body (shown) | `I'm a Mechatronics Engineering student working toward becoming an AI Product Engineer. I build with Claude Code and Codex, turning ideas into working products fast instead of waiting to master every layer first. Mechatronics means I think in real systems, not just code — I'm betting on understanding both the machines and the intelligence layered on top of them.` | `data/site.ts:12` |
| Long bio (not shown on the site; used only by the Ask Dharma AI) | `I'm a Mechatronics Engineering student (Government College of Engineering) working toward becoming an AI Product Engineer. I build with Claude Code and Codex, vibe coding ideas into working products fast instead of waiting to master every layer of the stack first. Mechatronics means I think in real systems, not just code. Most people building "AI products" only understand the software side — I'm betting on understanding both the machines and the intelligence layered on top of them.` | `data/site.ts:10` |
| Meta line | `Ratnagiri, Maharashtra · GCOE · Mechatronics` | `data/site.ts:20-22`, rendered `components/About.tsx:17` |
| Focus | `AI + Mechatronics` (not shown; AI only) | `data/site.ts:23` |
| Stats | **None shown.** `yearsExperience: 1` exists but nothing uses it. | `data/site.ts:24` |
| Links | `GitHub`, `LinkedIn`, `X`, `Email` | `components/About.tsx:5-10` |

### Now (between About and Projects)

| Item | Value | Source |
|---|---|---|
| Section label | `now` | `components/Now.tsx:11` |
| Bullet 1 | `Building STEVE — eight always-on AI departments that run the work of a startup while the founder approves.` | `data/now.ts:8` (+ Supabase `now_items`, position 1) |
| Bullet 2 | `Shipping DStack, a CLI that turns a rough idea into a structured AI-assisted build pipeline.` | `data/now.ts:9` (+ Supabase, position 2) |
| Bullet 3 | `Leading the powertrain team for Team Gladiator's ATVC build.` | `data/now.ts:10` (+ Supabase, position 3) |
| Updated | `Updated: 2026-10-14` | `data/now.ts:12` |
| Recently shipped (branch only) | Latest 5 public GitHub commits, pulled live | `components/Now.tsx`, `lib/github.ts` |

### Ask (branch only, below About)

| Item | Value | Source |
|---|---|---|
| Input placeholder | `Ask anything about my work` | `components/ask/AskDharma.tsx:92` |
| Starter questions | `What is DStack?` · `What's he building now?` · `Is he open to internships?` · `What's his tech stack?` | `lib/ai/constants.ts:7-10` |
| Disclaimer | `AI answers from this site's content. It can be wrong — the case studies are the source of truth.` | `components/ask/AskDharma.tsx` (last `<p>`) |
| Refusal phrase | `I don't have that — email Dharma` | `lib/ai/constants.ts:4` |

## 4. Experience

Section label `work` (`components/WorkExperience.tsx:10`). All entries come from `data/experience.ts`.

| # | Org | Role | Dates | Description | Source |
|---|---|---|---|---|---|
| 1 | `Innovation & Startup Cell` | `Web Design & Development Head` | `May 2026 – Present` | `Designed and built the complete full-stack website for the Innovation & Startup Cell, including frontend, backend, responsive UI, and core website functionality. Currently leading web design and development, managing website updates, digital presence, and technical support for events, programs, and startup-related activities.` | `data/experience.ts:5-11` |
| 2 | `Innovation & Startup Cell` | `Technical Team Member` | `Nov 2025 – May 2026` | `Supported ISC's website, digital systems, and event tech.` | `data/experience.ts:14-16` |
| 3 | `Innovex – LSPGCOER` | `Member` | `Aug 2026 – Present` | `Member of Innovex, the college's Entrepreneurship Cell, built and run as part of NEC (National Entrepreneurship Challenge) — a national program guiding colleges to develop a functioning E-Cell through structured tasks and activities.` | `data/experience.ts:21-27` |
| 4 | `Team Gladiator` | `Powertrain Team Leader` | `Nov 2025 – Present` | `Leading the powertrain team for Team Gladiator's ATVC project. Also building and maintaining the team's website, currently in progress.` | `data/experience.ts:32-38` |
| 5 | `Mechatronix Students Association` | `Design Team Member` | `Sep 2025 – Present` | `Creating clean, engaging visuals for events, social media, and student activities while supporting the team with creative design ideas and consistent branding.` | `data/experience.ts:43-49` |
| 6 | `Jawahar Navodaya Vidyalaya` | `School Captain` | `Jun 2022 – Apr 2023` | `Led student activities, coordinated with teachers and students, managed school events, and represented the student body.` | `data/experience.ts:54-60` |

**Education:** not on the site at all. It appears only in the resume PDF (see Issues).

## 5. Projects

Section label `projects`; filters `All` · `AI & Workflows` · `Web` (`components/projects/ProjectList.tsx:11-15`). Listed by `order`. Each case study's links section shows `Live site →` / `Source on GitHub →`, or `Private repository.` / `No public links yet.` (`app/projects/[slug]/page.tsx:59-62,95`).

| Order | Name | Category | Stack / tags | Year · dates · status | Summary (list row) | Description | Links | Source |
|---|---|---|---|---|---|---|---|---|
| 1 | `DStack` | AI | `TypeScript, pnpm monorepo, Gemini API, Vitest` | 2026 · `May 2026 – Present` · In progress | `CLI workflow orchestration` | `A CLI-native, API-first workflow orchestration system that turns a rough product idea into a structured AI-assisted build pipeline.` | repo https://github.com/dhrma-tech/DSTACK | `content/projects/dstack.mdx:2-12` |
| 2 | `STEVE` | AI | `Next.js 16, React 19, Prisma 7, TypeScript` | 2026 · `May 2026 – Present` · In progress | `Multi-agent startup OS` | `Multi-AI agent orchestration platform where eight always-on AI departments pick up the real work of building a startup while the founder reviews and approves.` | repo https://github.com/dhrma-tech/STEVE | `content/projects/steve.mdx:2-12` |
| 3 | `Vexor.AI` | AI | `JavaScript` | 2025 · `Sep 2025 – Oct 2025` · Shipped | `AI test-suite generator` | `An interactive web platform that acts as a sparring partner for your code — paste in functions and the AI generates a test suite that challenges your logic and surfaces edge cases.` | repo https://github.com/dhrma-tech/Vexor.AI | `content/projects/vexor-ai.mdx:2-12` |
| 4 | `Career Copilot` | AI | `Gemini API, CSS` | 2025 · `Sep 2025 – Oct 2025` · Shipped | `Gemini career roadmaps` | `A personalized, AI-powered website that guides students through their career and education journey using the Google Gemini API.` | repo https://github.com/dhrma-tech/career_copilot | `content/projects/career-copilot.mdx:2-12` |
| 5 | `InnovationAndStartupCell` | Web | `TypeScript` | 2026 · `"2026"` · Shipped | `Full-stack site for GCOE's ISC` | `Complete full-stack website for the Innovation & Startup Cell of Government College of Engineering Ratnagiri.` | private, no links | `content/projects/innovation-and-startup-cell.mdx:2-12` |
| 6 | `CounselPro` | Web | `TypeScript` | 2026 · `"2026"` · Shipped | `Admission guidance platform` | `A student counseling and admission guidance platform that helps colleges manage student inquiries, counselor workflows, and admission records.` | repo https://github.com/dhrma-tech/CounselPro | `content/projects/counselpro.mdx:2-12` |
| 7 | `ScanRoll` | Web | `TypeScript, Supabase` | 2026 · `Apr 2026 – Present` · In progress | `QR attendance for colleges` | `Open-source QR code attendance system for colleges with student, teacher, HOD, and admin roles.` | repo https://github.com/dhrma-tech/ScanRoll | `content/projects/scanroll.mdx:2-12` |
| 8 | `GladiatorRacing` | Web | `HTML` | 2025 · `"2025"` · Shipped | `Team Gladiator ATVC site` | `Website for Team Gladiator, LSP Government College of Engineering Ratnagiri's team competing in the Aravalli Terrain Vehicle Championship.` | private, no links | `content/projects/gladiator-racing.mdx:2-12` |

Featured: DStack, STEVE, Vexor.AI and Career Copilot (`featured: true`). None of the projects has a `live` URL.

### Case study bodies (exact text, excluding `<Todo>` notes)

**DStack** (`content/projects/dstack.mdx`)
- Problem (l.17): `Going from a rough product idea to a shipped build with AI assistants tends to be ad hoc: planning, architecture, implementation, refinement and deployment happen in scattered prompts with no shared structure.`
- What I built (l.23-27): `A CLI-native, API-first workflow orchestration system that turns a rough product idea into a structured AI-assisted build pipeline: planning, architecture, implementation, refinement, and deployment.` / `Built as a pnpm TypeScript monorepo.` / `Gemini-backed, with an offline "fake provider" mode so it runs without an API key.` / `Tested with Vitest.`
- Key decisions (l.35-36): `**Offline fake provider.** The pipeline can run end to end without an API key, which keeps tests deterministic and lets anyone try it.` / `**CLI-native and API-first.** The same pipeline is reachable from the terminal and programmatically.`
- Architecture, Results: Todo only (l.31, 42).

**STEVE** (`content/projects/steve.mdx`)
- Problem (l.17): `A solo founder has to cover engineering, marketing, sales, design, support, ops, finance and legal at once.`
- What I built (l.23-29): `A multi-AI agent orchestration platform: eight always-on AI departments (Engineering, Marketing, Sales, Design, Support, Ops, Finance, Legal) pick up the real work of building a startup while the founder reviews and approves.` / `A real tool-use LLM loop with 14 tool modules across GitHub, Vercel, Supabase, and Stripe.` / `Multi-agent delegation between departments.` / `Human-approval gates before actions take effect.` / `Persistent per-agent memory, streamed live.` / `Built on Next.js 16, React 19, Prisma 7, and 94 API routes.`
- Key decisions (l.37-38): `**Human-approval gates.** Agents propose; the founder approves before anything with real-world side effects runs.` / `**Per-agent memory.** Each department keeps its own persistent context instead of sharing one global prompt.`
- Architecture, Results: Todo only (l.33, 44).

**Vexor.AI** (`content/projects/vexor-ai.mdx`)
- Problem (l.17): `It's easy to write code that works on the happy path and miss the edge cases.`
- What I built (l.23): `An interactive web platform that acts as a sparring partner for your code. Paste in your functions, and the AI generates a comprehensive test suite to challenge your logic and surface edge cases.`
- Results (l.35): `A huge learning win in backend sandboxing, API handling, and deployment.`
- Architecture, Key decisions: Todo only (l.27, 31).

**Career Copilot** (`content/projects/career-copilot.mdx`)
- Problem (l.17): `Students often don't have a clear, personalized path through their career and education choices.`
- What I built (l.23-27): `A personalized, AI-powered website that guides students through their career and education journey using the Google Gemini API:` / `A custom career roadmap.` / `Relevant course recommendations.` / `A task management system to track goals.`
- Architecture, Key decisions, Results: Todo only (l.31, 35, 39).

**CounselPro** (l.15): `CounselPro is a student counseling and admission guidance platform built to help colleges manage student inquiries, counselor workflows, and admission records.`

**ScanRoll** (l.15): `Open-source QR Code Attendance System for colleges with student, teacher, HOD, and admin roles, Supabase backend, QR validation, attendance records, and reports.`

**InnovationAndStartupCell** (l.15): `Complete full-stack website for the Innovation & Startup Cell of Government College of Engineering Ratnagiri.`

**GladiatorRacing** (l.15): `We are Team Gladiator, a dedicated cohort of engineers from the LSP Government College of Engineering, Ratnagiri. Our mission is to design, fabricate, and conquer the Aravalli Terrain Vehicle Championship.`

**Writing:** no posts exist. `content/writing/README.md` holds authoring notes only, and the Writing section and its nav item are hidden (`components/Writing.tsx:7`, `lib/nav.ts:19-20`).

## 6. Skills

### Shown on the site: `stack` section (`data/stack.ts:3-8`, rendered `components/Stack.tsx`)

| Group | Items | Line |
|---|---|---|
| Build | `Claude Code` · `Next.js` · `React` · `TypeScript` · `Tailwind` · `Framer Motion` | `data/stack.ts:4` |
| AI | `Gemini API` · `Google AI SDK` · `Claude API` · `RAG` · `agents` | `data/stack.ts:5` |
| Data & Ship | `Supabase` · `PostgreSQL` · `Vercel` · `Git/GitHub` | `data/stack.ts:6` |
| Learning | `Python` | `data/stack.ts:7` |

### Not shown anywhere: `legacySkills` (`data/stack.ts:11-15`)

| Group | Items (deduplicated, original spelling) |
|---|---|
| domain (l.12) | `AI Workflow Design`, `AI-Assisted Development`, `Product Design`, `Product Engineering`, `System Architecture`, `Entrepreneurship`, `Event Management`, `Community Management`, `Startups` |
| languages (l.13) | `TypeScript`, `JavaScript`, `Python`, `HTML`, `CSS`, `SQL` |
| tools (l.14) | `Claude Code`, `Next.js 14`, `React`, `Tailwind CSS`, `Framer Motion`, `Supabase`, `PostgreSQL`, `Google AI SDK`, `Gemini API`, `Vercel`, `Git`, `GitHub` |

**Combined unique list** (merging spelling variants): Claude Code, Next.js, React, TypeScript, JavaScript, Tailwind CSS, Framer Motion, HTML, CSS, SQL, Python, Gemini API, Google AI SDK, Claude API, RAG, Agents, Supabase, PostgreSQL, Vercel, Git, GitHub, AI Workflow Design, AI-Assisted Development, Product Design, Product Engineering, System Architecture, Entrepreneurship, Event Management, Community Management, Startups.

Also in project tags but not in either list: `pnpm monorepo`, `Vitest`, `Prisma 7`, `React 19`, `Next.js 16`.

## 7. Certifications

Section label `certifications` (`components/Certifications.tsx:10`). Each row shows `Verify →`.

| Name | Issuer | Date | Verify link | Logo | Source |
|---|---|---|---|---|---|
| `Claude Code 101` | `Anthropic` | `May 2026` | https://verify.skilljar.com/c/8zdpaj3qvtdy (200 OK) | `public/logos/anthropic.png` | `data/certifications.ts:4-10` |
| `Programming for Everybody (Getting Started with Python)` | `University of Michigan` | `Jun 2026` | https://www.coursera.org/account/accomplishments/verify/ECF4C6I0DOGV (200 OK) | `public/logos/michigan.png` | `data/certifications.ts:11-17` |

## 8. Contact, socials, footer, nav

| Item | Value | Source |
|---|---|---|
| Contact headline | `Let's build something.` | **hardcoded** `components/Contact.tsx:17` |
| Email | `aparadhdharmaraj@gmail.com` | `data/site.ts:14` |
| GitHub | https://github.com/dhrma-tech | `data/site.ts:16` |
| LinkedIn | https://www.linkedin.com/in/dharma-a-921432260/ (redirects to the URL without the trailing slash) | `data/site.ts:17` |
| X | https://x.com/dhrma_x | `data/site.ts:18` |
| Resume | `/Profile.pdf` (also `/resume` → 307 to `/Profile.pdf`) | `data/site.ts:25`, `next.config.mjs` redirects |
| Contact links row | `GitHub` · `LinkedIn` · `X` · `Resume` | `components/Contact.tsx:6-11` |
| Contact form (branch only) | labels `name` / `email` / `message`; button `Send message` / `Sending…` / `Retry`; success `Sent. I'll reply within 48 hours.` + `Send another` | `components/contact/ContactForm.tsx` |
| Footer | `© 2026 Dharmaraj Sunil Aparadh · Built with Claude Code · Last updated 2026-10-14` (year and date are the **build date**) | `components/Footer.tsx:4-12` |
| Nav items | `About` `#about` · `Projects` `#projects` · `Work` `#work` · `Writing` `#writing` (hidden, no posts) · `Stack` `#stack` · `Contact` `#contact` · `Resume` `/resume` | `lib/nav.ts:8-16` |
| Monogram | `DA`, aria-label `Dharmaraj Aparadh — home` | **hardcoded** `components/nav/Monogram.tsx:7,10` |
| Mobile menu | `Menu` / `Close`, dialog label `Site navigation` | `components/nav/MobileMenu.tsx:53,61,70` |
| Detail-page back links | `← all projects`, `← all writing`, `← previous`, `next →` | `app/projects/[slug]/page.tsx`, `app/writing/[slug]/page.tsx` |

## 9. Assets (`public/`)

| File | Size | Used by | Status |
|---|---|---|---|
| `public/profile.jpeg` | 132 KB | Hero photo (`components/Hero.tsx:41`), JSON-LD image (`app/page.tsx:31`) | used |
| `public/Profile.pdf` | 53 KB, 3 pages (LinkedIn "Save to PDF" export, dated Aug 28) | Resume link (`data/site.ts:25`), `/resume` redirect, nav "Resume", contact "Resume" | used, **outdated** (see Issues) |
| `public/logos/anthropic.png` | 11 KB | `data/certifications.ts:9` | used |
| `public/logos/michigan.png` | 2.5 KB | `data/certifications.ts:16` | used |

Non-`public` assets that ship: `app/favicon.ico` (stock Next.js icon), `app/icon.svg` ("DA" in old brand colours), `app/fonts/GeistMono-Regular.woff2`, and `assets/og/*.ttf` (OG image fonts).

**No unused files in `public/`.** The case studies link no images (no `/projects/*` folder exists yet).

---

## Live site differences

Checked 2026-10-15 with each URL fetched once.

- **Content:** every visible string on the live homepage matches `main` word for word: meta, hero, about, now, 8 projects, 6 work entries, stack, certifications, contact, footer.
- **Not live yet** (on `redesign/v2` only): the Ask section, the contact form, "recently shipped" commits, view counters, and Now/hero data from Supabase. `/api/github` returns 404 on the live site.
- **Links:** all internal pages, assets, 6 GitHub repos, X, and both verify links return 200. `/resume` → 307 → `/Profile.pdf` (intended). LinkedIn → 301 to the same URL without the trailing slash. `/writing` → 404, which is expected because there's no index page and no posts.

## Issues

### Broken or placeholder links
- No broken links and no placeholder domains (`your-domain`, `example.com`, lorem) anywhere in the content.
- `data/site.ts:17`: LinkedIn URL has a trailing slash that LinkedIn 301-redirects away. Harmless, but `https://www.linkedin.com/in/dharma-a-921432260` is the canonical form.
- No project has a `live` URL, so every case study shows only "Source on GitHub" or "Private repository."

### Placeholder or unfinished content
- 16 `<Todo>` blocks across `dstack.mdx` (l.19, 31, 38, 42), `steve.mdx` (l.19, 33, 40, 44), `vexor-ai.mdx` (l.19, 27, 31, 37) and `career-copilot.mdx` (l.19, 31, 35, 39). They're hidden in production, so the live case studies show empty headings: **Architecture** (all 4), **Results / what I learned** (DStack, STEVE, Career Copilot) and **Key decisions** (Vexor.AI, Career Copilot).
- `data/now.ts:4`: TODO. The Now bullets are still seeded from project descriptions.
- `app/favicon.ico` is the stock create-next-app icon (25,931 bytes). Browsers that request `/favicon.ico` show the Next.js logo instead of "DA".

### Outdated or inconsistent info
- **Resume PDF (`public/Profile.pdf`) is out of sync with the site:**
  - **Privacy:** it publishes your mobile number `7219527721`, which the site itself never shows.
  - The name reads `Dharma A`; the site says `Dharmaraj Sunil Aparadh` / `Dharmaraj Aparadh`.
  - It lists **VOLTIC** ("an AI layer for machine and sensor data (pitched at Eureka 2026, IIT Bombay)") and a **Cofounder, startup-specific web dev** role. Neither appears on the site.
  - It lists certifications **Full Stack Dev MasterClass** and **Gemini Kickstart Workshop**, which are missing from `data/certifications.ts`.
  - It has an **Education** section: Government College of Engineering, B.Tech in Mechatronics, Robotics, and Automation Engineering (Sep 2025); JNV (Jul 2017 – Mar 2024). The site has no education section.
  - Durations are frozen ("4 months", "10 months", "1 month") and the org name is misspelled `Inovexlspgcoer`.
- **The college is named 6 different ways:** `GCOE` (`data/site.ts:21`), `Government College of Engineering` (`data/site.ts:10`), `Government College of Engineering, Ratnagiri` (`app/page.tsx:36`), `Government College of Engineering Ratnagiri` (no comma, `innovation-and-startup-cell.mdx:4,15`), `LSP Government College of Engineering, Ratnagiri` (`gladiator-racing.mdx:15`) and `LSPGCOER` (`data/experience.ts:21`). The resume adds `Mechatronix Students Association LSPGCOER`.
- **Discipline:** the site says `Mechatronics`, the resume says `Mechatronics, Robotics, and Automation Engineering`.
- **Team Gladiator website status:** the experience entry says the website is `currently in progress` (`data/experience.ts:38`), but the project says `status: Shipped`, `2025` (`gladiator-racing.mdx:5-7`).
- **Gladiator project copy** is written as "We are Team Gladiator… Our mission is…" (`gladiator-racing.mdx:15`), i.e. pasted from the team site rather than describing what you built.
- **Project titles** `InnovationAndStartupCell` and `GladiatorRacing` are repo names. Everywhere else they're `Innovation & Startup Cell` / `Team Gladiator`.
- **Date formats are mixed:** CounselPro, ISC and GladiatorRacing use a bare year (`"2026"`, `"2025"`); the others use month ranges.
- **STEVE claims to verify:** `14 tool modules`, `94 API routes` (`steve.mdx:25,29`).
- **Experience timeline:** the ISC "Technical Team Member" role ends `May 2026` and "Web Design & Development Head" starts `May 2026`. Consistent, but the resume shows the org total as "10 months", which no longer matches.
- **The positioning line repeats the tagline:** `data/site.ts:7` and `:9` share the sentence "Building AI products at the intersection of hardware and intelligence".
- **Footer "Last updated"** is the build date, not the content date, so it changes on every deploy.
- **`app/icon.svg`** uses `#2d241e` / `#f5f1e8`, colours from the old design. The current tokens are `#0A0A0A` / `#FAFAF9` with accent `#FF4F00`.
- **JSON-LD:** `email` has a `mailto:` prefix (schema.org expects the bare address), and `alumniOf` describes a current student.

### Duplicates
- Skills are split across `stack` and the unused `legacySkills`, with spelling variants: `Tailwind` / `Tailwind CSS`, `Next.js` / `Next.js 14` (STEVE uses Next.js 16), `Git/GitHub` / `Git` + `GitHub`. Python is under both "Learning" and "languages". `agents` is lowercase, unlike everything else.
- The Now bullets duplicate project and experience copy (`data/now.ts:8-10` vs `steve.mdx:4`, `dstack.mdx:4`, `data/experience.ts:38`).
- The Now content now lives in two places: `data/now.ts` (backup) and Supabase `now_items` / `site_settings` (live on the branch). Edits must go to both.
- The About and Contact link rows repeat the same GitHub / LinkedIn / X links (`components/About.tsx:5-10`, `components/Contact.tsx:6-11`).
- ScanRoll: frontmatter says `QR code attendance system` (l.4), the body says `QR Code Attendance System` (l.15).

### Typos
- Site content: none found.
- Resume PDF: `Inovexlspgcoer`. The summary also runs sentences together, e.g. `AI Product Engineer.Currently focused on`, `Codex)Vibe coding`, `stack firstAutomation`.

### Missing alt text
- No `<img>` is missing an `alt` attribute.
- Certification logos use `alt=""` (`components/Certifications.tsx:17`). This is intentional, because the certification name sits right next to the logo, but say if you want the logos announced.
- The MDX `Figure` component requires `alt` and shows it as the caption (`components/mdx/MdxComponents.tsx:18-22`). No figures are used yet.

### Unused data
- `site.yearsExperience` (`data/site.ts:24`): never read.
- `legacySkills` (`data/stack.ts:11-15`): never read.
- `site.bio` and `site.focus` (`data/site.ts:10,23`): read only by the Ask Dharma AI, never shown.

### Content hardcoded in components instead of data files
| Text | Location |
|---|---|
| `Now building` | `components/Hero.tsx:90` |
| `Let's build something.` | `components/Contact.tsx:17` |
| Meta description tail `AI Product Engineer and Mechatronics Engineering student building AI-native products with Claude Code — portfolio, projects, and work experience.` | `app/layout.tsx:36` |
| SEO keywords list | `app/layout.tsx:45-53` |
| JSON-LD address (`Ratnagiri`, `Maharashtra`, `IN`) and college name | `app/page.tsx:35-36` (duplicates `site.location`) |
| Monogram `DA` and its aria-label `Dharmaraj Aparadh — home` | `components/nav/Monogram.tsx:7,10`, `lib/og.tsx:84`, `app/icon.svg` |
| `Built with Claude Code` | `components/Footer.tsx:11` |
| Project filter label `AI & Workflows` | `components/projects/ProjectList.tsx:13` |
| Nav labels | `lib/nav.ts:8-16` |
| Ask starter questions, placeholder, disclaimer | `lib/ai/constants.ts:7-10`, `components/ask/AskDharma.tsx` |
| Contact form copy (`Sent. I'll reply within 48 hours.` etc.) | `components/contact/ContactForm.tsx` |
| AI knowledge-base facts (`Government College of Engineering, Ratnagiri`) | `lib/ai/sources.ts:46` |
| 404 copy | `app/not-found.tsx:6-13` |
