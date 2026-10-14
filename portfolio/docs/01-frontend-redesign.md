# Portfolio Redesign — Frontend Plan (Claude Code prompt)

> Paste this whole file into Claude Code at the root of the portfolio repo (deployed at https://dharma-phi.vercel.app).
> Run backend plan (`02-backend-plan.md`) AFTER Phase 4 of this file.

---

## 0. Role and ground rules

You are redesigning my existing Next.js portfolio. Before writing any code:

1. Read the repo: `package.json`, `app/` (or `pages/`), `components/`, `tailwind.config.*`, `public/`, any data files.
2. Report back in ≤15 lines: Next.js version, router type, Tailwind version, animation libs, where content lives (hardcoded vs data files), and anything broken.
3. Create a branch `redesign/v2`. Commit after every phase with a clear message.
4. Do NOT delete existing content (experience, projects, certs, links). Migrate it into the new data layer.
5. Keep changes minimal per phase; stop at the end of each phase and show me a summary + what to check in the browser.

**Design direction:** leerob.com minimalism (narrow column, text-first, fast) + a full-bleed typographic hero inspired by paulkalkbrenner.net (giant name spanning the viewport with a small photo inline between first and last name).

---

## 1. Design tokens

### Colors (CSS variables, Tailwind maps to them)

| Token | Light (default) | Dark |
|---|---|---|
| `--bg` | `#FAFAF9` | `#0A0A0A` |
| `--fg` | `#0A0A0A` | `#EDEDED` |
| `--muted` | `#737373` | `#8B8B8B` |
| `--subtle` | `#E7E5E4` (borders/dividers) | `#262626` |
| `--surface` | `#FFFFFF` (cards, hover rows) | `#141414` |
| `--accent` | `#FF4F00` | `#FF6A3D` |

Rules:
- Accent is used ONLY for: "Open to internships" status dot/text, link hover underline, focus ring, the active nav item, and one CTA. Nothing else.
- No gradients, no glassmorphism, no drop shadows. Borders are 1px `--subtle`.
- Check contrast: `--muted` on `--bg` must pass WCAG AA for body text sizes used.

### Typography (via `next/font/google`, self-hosted, `display: swap`)

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display | **Inter Tight** | 800 | Hero name, section headings |
| Body | **Inter** | 400, 500 | All body text, nav |
| Mono | **Geist Mono** | 400 | Dates, tech tags, metadata, footer |

Type scale:
- Hero name: auto-fit to viewport width (see §3), weight 800, `letter-spacing: -0.05em`, `line-height: 0.9`.
- H2 (section titles): 14px, Geist Mono, uppercase NOT allowed — use lowercase labels like `work`, `projects`, `writing`, color `--muted`. (leerob style)
- Item titles: 16px Inter 500.
- Body: 16px Inter 400, `line-height: 1.7`.
- Meta: 13px Geist Mono, `--muted`.

### Layout
- Content column: `max-width: 640px`, centered, `px-6` mobile.
- Hero only: full-bleed width.
- Vertical rhythm: sections separated by `py-16` (desktop) / `py-12` (mobile).

### Theme toggle
- Use `next-themes` with `attribute="class"`, default `light`, respect `system` on first visit.
- No flash of wrong theme (suppressHydrationWarning on `<html>`).
- Toggle lives in the hero bottom bar (see §3) as text: `Theme: Light` / `Theme: Dark`, and in the sticky nav after scroll.

---

## 2. Information architecture

Single long homepage + case-study detail pages.

```
/                      Home (hero + all sections)
/projects/[slug]       Case study page per project (MDX)
/resume                Redirect to /Profile.pdf (keep existing file)
```

Homepage section order:
1. Hero (full-bleed)
2. About (3–4 lines max)
3. Now (what I'm building this month — 2–3 bullets)
4. Projects (featured 4, rows not cards)
5. Work (experience list)
6. Writing (optional, hide section if empty)
7. Stack (grouped plain text — NO marquee)
8. Certifications
9. Contact + footer

---

## 3. Hero spec (Kalkbrenner-style)

Full viewport height (`min-h-[100svh]`), background `--bg`, three zones:

**Top bar**
- Left: circular monogram `DA` (32px circle, 1px `--fg` border, Inter Tight 800, slight rotate like the PK logo).
- Right: nav links in Inter 500, 15px, generous spacing: `About  Projects  Work  Writing  Stack  Contact  Resume`. Anchor links with smooth scroll. Active section gets `--accent`.
- Mobile: collapse to a `Menu` text button → full-screen overlay list in large Inter Tight.

**Center**
- `Dharmaraj [photo] Aparadh` on ONE line on desktop.
- Photo: inline rectangle between the two words, height ≈ cap-height of the text, aspect ~ 1.1:1, grayscale by default → color on hover (300ms). Use existing `/profile.jpeg` via `next/image`, `priority`.
- Auto-fit: implement a `<FitText>` component that measures the line and sets `font-size` so it spans ~88% of viewport width; recompute on resize (ResizeObserver, debounced). SSR fallback: `font-size: clamp(56px, 11.5vw, 220px)`.
- Mobile (<640px): stack as `Dharmaraj` / photo / `Aparadh`, left-aligned, each word fit to width.

**Bottom bar** (mirrors the reference's 3 columns)
- Left (replaces "Now playing"): small animated 5-bar equalizer icon in `--accent` + two lines: `Now building` (muted) / `STEVE` (fg) — value comes from data file `now.ts`.
- Center: one-line positioning in Inter 500, max 3 lines: *"AI Product Engineer & Mechatronics student. Building AI products at the intersection of hardware and intelligence."*
- Right (replaces "Sound OFF"): `Theme: Light` toggle text button. Below it, a small green-orange dot + `Open to internships`.

**Motion (Framer Motion, subtle)**
- On load: name letters rise in with 20ms stagger, photo scales from 0.9→1. Total < 700ms.
- On scroll: hero name scales slightly down and fades as content scrolls over (no parallax jank).
- Respect `prefers-reduced-motion`: disable all of the above.

**Sticky nav after hero**: when hero leaves viewport, show a slim top bar (48px, `--bg` with bottom border) containing monogram + nav + theme toggle.

---

## 4. Section specs (leerob-style)

**About** — 3–4 lines from current About text, tightened. Inline meta row in mono: `Ratnagiri, Maharashtra · GCOE · Mechatronics`. Links inline: GitHub, LinkedIn, X, Email (underline on hover in accent).

**Now** — 2–3 bullet lines from `data/now.ts` + `Updated: <date>` in mono. This is what I'll update weekly.

**Projects** — list rows, not cards:
```
DStack                      CLI workflow orchestration       2026 →
STEVE                       Multi-agent startup OS           2026 →
Vexor.AI                    AI test-suite generator          2025 →
Career Copilot              Gemini career roadmaps           2025 →
```
- Row hover: background `--surface`, arrow shifts 4px right.
- Below title on hover/expand: 1-line description + tech tags in mono.
- Row links to `/projects/[slug]`.
- Toggle filter (text pills): `All · AI & Workflows · Web` — keep existing categories.

**Project case study page `/projects/[slug]`** (MDX via `next-mdx-remote` or `@next/mdx`, content in `content/projects/*.mdx`):
- Frontmatter: `title, summary, year, status, stack[], repo, live, cover, featured, category`.
- Sections template: Problem → What I built → Architecture (image/diagram) → Key decisions → Results / what I learned → Links.
- Back link `← all projects`, prev/next project links at bottom.
- Pre-fill MDX for DStack, STEVE, Vexor.AI, Career Copilot using the existing descriptions; leave clear `TODO:` markers where I must add architecture images/results.

**Work** — rows: `Role` (16px 500) / `Org` (muted) / dates right-aligned in mono. Entries: Innovation & Startup Cell (Web Design & Dev Head, May 2026–Present; Technical Team Member Nov 2025–May 2026 — group under one org), Innovex – LSPGCOER, Team Gladiator (Powertrain Team Leader), Mechatronix Students Association, Jawahar Navodaya Vidyalaya (School Captain). Description reveals on click (accordion, keyboard accessible).

**Writing** — list of posts (title + date mono). Source: `content/writing/*.mdx`. Hide whole section if 0 posts.

**Stack** — REMOVE the infinite marquee. Replace with 3 grouped plain-text lines:
- `Build` — Claude Code, Next.js, React, TypeScript, Tailwind, Framer Motion
- `AI` — Gemini API, Google AI SDK, Claude API, RAG, agents
- `Data & Ship` — Supabase, PostgreSQL, Vercel, Git/GitHub
- `Learning` — Python
Each tool name in mono, separated by `·`.

**Certifications** — rows: name / issuer (muted) / date mono / `Verify →` link. Keep logos tiny (16px) or drop them.

**Contact** — Big Inter Tight line: `Let's build something.` + email as large underlined link + contact form (backend plan) + socials row.

**Footer** — mono 13px: `© 2026 Dharmaraj Sunil Aparadh · Built with Claude Code · Last updated <build date>`.

---

## 5. Data layer

Move all content out of components into typed files:
```
data/
  site.ts          name, role, tagline, email, socials, location, resumeUrl, siteUrl
  now.ts           { building: "STEVE", items: [...], updated: "2026-10-14" }
  experience.ts    Experience[]
  stack.ts         grouped stack
  certifications.ts
content/
  projects/*.mdx
  writing/*.mdx
lib/
  content.ts       loaders for MDX (getAllProjects, getProject(slug), getAllPosts)
```
All types in `types/content.ts`. Components only render data.

---

## 6. SEO, meta, performance

- **Bug to fix:** current OG/Twitter meta point to `https://your-domain-here.com`. Replace with `site.siteUrl` (`https://dharma-phi.vercel.app` until a custom domain exists) via `metadataBase`.
- Dynamic OG image per page using `next/og` (`app/opengraph-image.tsx`, and per project) — style: P1 colors, name in Inter Tight 800.
- `sitemap.ts`, `robots.ts`, JSON-LD `Person` schema on home.
- Lighthouse targets: Performance ≥ 95, Accessibility 100, SEO 100 (mobile).
- Fonts via `next/font`, images via `next/image`, no client JS in sections that don't need it (Server Components by default; `"use client"` only for hero motion, theme toggle, filters, accordion, form).

---

## 7. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`).
- Visible focus ring in `--accent` (2px offset).
- Skip-to-content link.
- Hero photo has alt text; decorative equalizer `aria-hidden`.
- All interactions keyboard operable; reduced motion respected.

---

## 8. Phases (stop and report after each)

| Phase | Scope | Done when |
|---|---|---|
| 1 | Audit + branch + tokens + fonts + theme toggle + data layer migration | Site renders old content in new fonts/colors, both themes work, no flash |
| 2 | Hero (FitText, inline photo, top/bottom bars, motion, mobile stack) + sticky nav | Name fits one line 1024–1920px, stacks <640px, reduced-motion OK |
| 3 | About, Now, Work, Stack, Certifications, Contact layout, Footer | All old content present, marquee removed |
| 4 | Projects list + filters + MDX case study pages (4 projects pre-filled) | `/projects/dstack` etc. render; prev/next works |
| 5 | Writing section (MDX), SEO/OG/sitemap/JSON-LD, meta bug fix | OG preview correct on LinkedIn Post Inspector |
| 6 | Polish: hover states, spacing pass, Lighthouse, a11y check, 375px/768px/1440px screenshots | Targets in §6 met |

After Phase 4 → run `02-backend-plan.md`.

---

## 9. Do NOT

- Add 3D/WebGL, particle backgrounds, cursor followers, skill % bars, or logo walls.
- Use more than one accent color.
- Use emoji in UI.
- Break existing URLs (`/Profile.pdf` must still work).
- Install heavy UI kits (no MUI/Chakra). shadcn/ui primitives only if truly needed.
