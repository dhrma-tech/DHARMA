"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { now } from "@/data/now";
import ThemeToggle from "@/components/ThemeToggle";
import FitText from "@/components/hero/FitText";
import Equalizer from "@/components/hero/Equalizer";

const [FIRST, LAST] = site.shortName.split(" ");
// Load animations are CSS keyframes (see tailwind.config) so the name is visible
// on first paint without waiting for hydration; Framer Motion drives the scroll effect.
const LETTER_STAGGER_MS = 20;
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

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between pt-20"
    >
      <motion.div
        style={animate ? { scale, opacity } : undefined}
        className="flex flex-1 items-center"
      >
        <h1 className="w-full font-display font-extrabold leading-[0.9] tracking-[-0.05em] text-fg">
          <span className="sr-only">{site.shortName}</span>

          {/* Desktop: one line, photo inline between the names, ~88% of viewport. */}
          <span aria-hidden="true" className="hidden w-full justify-center sm:flex">
            <FitText fraction={0.88}>
              <Word text={FIRST} offset={0} />
              <Photo className="mx-[0.12em] inline-block h-[0.72em] w-[0.8em] align-baseline" />
              <Word text={LAST} offset={FIRST.length} />
            </FitText>
          </span>

          {/* Mobile: stacked, left-aligned, each word fit to the column. */}
          <span aria-hidden="true" className="flex flex-col items-start gap-3 px-6 sm:hidden">
            <span className="block w-full">
              <FitText>
                <Word text={FIRST} offset={0} />
              </FitText>
            </span>
            <Photo className="block aspect-[1.1/1] w-[45%]" />
            <span className="block w-full">
              <FitText>
                <Word text={LAST} offset={FIRST.length} />
              </FitText>
            </span>
          </span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 px-6 pb-8 pt-10 sm:grid-cols-3 sm:items-end sm:gap-10 sm:px-10">
        <div className="flex items-center gap-3">
          <Equalizer />
          <div className="leading-tight">
            <p className="text-[13px] text-muted">Now building</p>
            <p className="text-[15px] font-medium text-fg">{now.building}</p>
          </div>
        </div>

        <p className="line-clamp-3 max-w-sm text-[15px] font-medium leading-snug text-fg sm:justify-self-center">
          {site.positioning}
        </p>

        <div className="flex flex-col items-start gap-1 leading-tight sm:items-end">
          <ThemeToggle />
          <p className="flex items-center gap-2 text-[13px] text-fg">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {site.availability}
          </p>
        </div>
      </div>
    </section>
  );
}
