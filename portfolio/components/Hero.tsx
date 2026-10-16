import Link from "next/link";
import { site } from "@/data/site";
import { getAllProjects } from "@/lib/content";
import type { NowData } from "@/lib/now";
import ThemeToggle from "@/components/ThemeToggle";
import FitText from "@/components/hero/FitText";
import CodeTyping from "@/components/hero/CodeTyping";
import HeroScrollFade from "@/components/hero/HeroScrollFade";
import HeroPhoto from "@/components/hero/HeroPhoto";

const [FIRST, LAST] = site.shortName.split(" ");
// Load animations are CSS keyframes (see tailwind.config) so the name is visible
// on first paint without waiting for hydration; Framer Motion (lazy) drives the scroll fade.
const LETTER_STAGGER_MS = 20;
// Line widths in em for Inter Tight 800 at -0.05em tracking (measured in-browser).
// They let FitText render the right size on the server; it re-measures after fonts load.
const NAME_LINE_EM = 9.97; // "Dharmaraj [photo] Aparadh"
const FIRST_EM = 4.836;
const LAST_EM = 4.025;
const PHOTO_SIZES = "(min-width: 640px) 16vw, 45vw";
const PHOTO_ALT = `Portrait of ${site.shortName}`;

function Word({ text, offset }: { text: string; offset: number }) {
  return (
    <span className="inline-block">
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="inline-block animate-rise motion-reduce:animate-none"
          style={{ animationDelay: `${(offset + i) * LETTER_STAGGER_MS}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function Photo({ className }: { className: string }) {
  return <HeroPhoto alt={PHOTO_ALT} sizes={PHOTO_SIZES} className={className} />;
}

/** Links to the project whose title matches `name`; plain text if none does. */
function NowBuilding({ name }: { name: string }) {
  const project = getAllProjects().find((p) => p.title.toLowerCase() === name.trim().toLowerCase());
  const content = (
    <>
      <CodeTyping />
      <span className="block leading-tight">
        <span className="block text-[13px] text-muted">Now building</span>
        <span className="block text-[15px] font-medium text-fg underline-offset-4 decoration-accent decoration-2 group-hover:underline">
          {name}
          {project && <span aria-hidden="true"> →</span>}
        </span>
      </span>
    </>
  );
  if (!project) return <div className="flex items-center gap-3">{content}</div>;
  return (
    <Link href={`/projects/${project.slug}`} className="group flex items-center gap-3 justify-self-start">
      {content}
    </Link>
  );
}

export default function Hero({ now }: { now: NowData }) {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between pt-20"
    >
      <HeroScrollFade className="flex flex-1 items-center">
        <h1 className="group w-full font-display font-extrabold leading-[0.9] tracking-[-0.05em] text-fg">
          <span className="sr-only">{site.shortName}</span>

          {/* Desktop: one line, photo inline between the names, ~88% of viewport. */}
          <span aria-hidden="true" className="hidden sm:block">
            <FitText em={NAME_LINE_EM} fraction={0.88} className="text-center">
              <Word text={FIRST} offset={0} />
              <Photo className="mx-[0.12em] inline-block h-[0.72em] w-[0.8em] align-baseline" />
              <Word text={LAST} offset={FIRST.length} />
            </FitText>
          </span>

          {/* Mobile: stacked, left-aligned, each word fit to the column. */}
          <span aria-hidden="true" className="flex flex-col items-start gap-3 px-6 sm:hidden">
            <FitText em={FIRST_EM}>
              <Word text={FIRST} offset={0} />
            </FitText>
            <Photo className="block aspect-[1.1/1] w-[45%]" />
            <FitText em={LAST_EM}>
              <Word text={LAST} offset={FIRST.length} />
            </FitText>
          </span>
        </h1>
      </HeroScrollFade>

      <div className="grid grid-cols-1 gap-6 px-6 pb-8 pt-10 sm:grid-cols-2 sm:items-end sm:gap-x-10 sm:px-10 lg:grid-cols-[1fr_2fr_1fr]">
        {/* sm–lg: positioning gets its own row; lg+: three columns. */}
        <NowBuilding name={now.building} />

        <p className="max-w-sm text-[15px] font-medium leading-snug text-fg sm:order-first sm:col-span-2 sm:max-w-md lg:order-none lg:col-span-1 lg:max-w-sm lg:justify-self-center">
          {site.positioning}
        </p>

        <div className="flex flex-col items-start gap-1 leading-tight sm:items-end">
          {now.availability && (
            <p className="flex items-center gap-2 text-[13px] text-fg">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {now.availability}
            </p>
          )}
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
}
