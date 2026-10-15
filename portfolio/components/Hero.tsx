import Image from "next/image";
import { site } from "@/data/site";
import type { NowData } from "@/lib/now";
import ThemeToggle from "@/components/ThemeToggle";
import FitText from "@/components/hero/FitText";
import Equalizer from "@/components/hero/Equalizer";
import HeroScrollFade from "@/components/hero/HeroScrollFade";

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
  return (
    <span className={`relative overflow-hidden bg-subtle animate-pop motion-reduce:animate-none ${className}`}>
      <Image
        src="/profile.jpeg"
        alt={PHOTO_ALT}
        fill
        priority
        sizes={PHOTO_SIZES}
        className="object-cover grayscale transition-[filter] duration-300 hover:grayscale-0"
      />
    </span>
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
        <h1 className="w-full font-display font-extrabold leading-[0.9] tracking-[-0.05em] text-fg">
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
        {/* sm–lg: positioning gets its own row so it fits in 3 lines; lg+: three columns. */}
        <div className="flex items-center gap-3">
          <Equalizer />
          <div className="leading-tight">
            <p className="text-[13px] text-muted">Now building</p>
            <p className="text-[15px] font-medium text-fg">{now.building}</p>
          </div>
        </div>

        <p className="line-clamp-3 max-w-sm text-[15px] font-medium leading-snug text-fg sm:order-first sm:col-span-2 sm:max-w-md lg:order-none lg:col-span-1 lg:max-w-sm lg:justify-self-center">
          {site.positioning}
        </p>

        <div className="flex flex-col items-start gap-1 leading-tight sm:items-end">
          <ThemeToggle />
          {now.availability && (
            <p className="flex items-center gap-2 text-[13px] text-fg">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {now.availability}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
