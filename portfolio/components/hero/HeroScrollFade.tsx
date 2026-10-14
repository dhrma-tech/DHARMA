"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scales the hero name down slightly and fades it as the page scrolls past the hero.
 * Framer Motion's `scroll()` is loaded lazily after hydration so it stays out of the
 * initial bundle, and is skipped entirely under prefers-reduced-motion.
 */
export default function HeroScrollFade({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const target = el?.closest("section");
    if (!el || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop: VoidFunction | undefined;
    let cancelled = false;
    import("framer-motion/dom").then(({ scroll }) => {
      if (cancelled) return;
      stop = scroll(
        // Two-arg callback: uses Framer's JS scroll measurement. The one-arg form goes
        // through native ScrollTimeline, which reported 0.5 progress at scrollY 0 here.
        (_: number, info) => {
          const progress = info.y.progress;
          el.style.transform = `scale(${1 - 0.08 * progress})`;
          el.style.opacity = String(Math.max(0, 1 - progress / 0.8));
        },
        { target, offset: ["start start", "end start"] }
      );
    });

    return () => {
      cancelled = true;
      stop?.();
      el.style.transform = "";
      el.style.opacity = "";
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
