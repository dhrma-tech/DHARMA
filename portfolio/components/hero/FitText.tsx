"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
// clsx (not cn/tailwind-merge) in client components keeps twMerge out of the bundle.
import { clsx as cn } from "clsx";

/**
 * Sizes its single line of content to span `fraction` of its own width.
 *
 * `em` is the line's measured width in em at the display font, so the server-rendered
 * size (`calc(… cqw / em)`, a container-query unit) already matches and there's no
 * layout shift on hydration. After fonts load, the line is measured and corrected
 * only if it drifts by more than 1% (e.g. different font rendering).
 * Everything inside should be sized in `em` so it scales linearly with font-size.
 */
export default function FitText({
  children,
  em,
  fraction = 1,
  className,
}: {
  children: ReactNode;
  em: number;
  fraction?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<string>(`calc(${fraction * 100}cqw / ${em})`);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const fit = () => {
      const available = container.clientWidth * fraction;
      const current = parseFloat(getComputedStyle(line).fontSize);
      const width = line.scrollWidth;
      // Hidden (display: none) layouts report 0 — skip until visible.
      if (!available || !width || !current) return;
      if (Math.abs(width - available) / available < 0.01) return;
      setFontSize(`${(current * available) / width}px`);
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const debouncedFit = () => {
      clearTimeout(timer);
      timer = setTimeout(fit, 100);
    };

    let cancelled = false;
    let observer: ResizeObserver | undefined;
    // Only measure the real font; measuring the fallback would cause a visible jump.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      fit();
      observer = new ResizeObserver(debouncedFit);
      observer.observe(container);
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [em, fraction]);

  return (
    <span ref={containerRef} className={cn("block w-full [container-type:inline-size]", className)}>
      <span ref={lineRef} className="inline-block whitespace-nowrap" style={{ fontSize }}>
        {children}
      </span>
    </span>
  );
}
