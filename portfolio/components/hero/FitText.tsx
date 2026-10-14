"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const SSR_FALLBACK = "clamp(56px, 11.5vw, 220px)";

/**
 * Sizes its single line of content so it spans `fraction` of the parent's width.
 * Everything inside should be sized in `em` so it scales linearly with font-size.
 */
export default function FitText({
  children,
  fraction = 1,
  className,
}: {
  children: ReactNode;
  fraction?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<string>(SSR_FALLBACK);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const available = parent.clientWidth * fraction;
      const current = parseFloat(getComputedStyle(el).fontSize);
      const width = el.scrollWidth;
      // Hidden (display: none) layouts report 0 — skip until visible.
      if (!available || !width || !current) return;
      setFontSize(`${(current * available) / width}px`);
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const debouncedFit = () => {
      clearTimeout(timer);
      timer = setTimeout(fit, 100);
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(debouncedFit);
    observer.observe(parent);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [fraction]);

  return (
    <span ref={ref} className={cn("inline-block whitespace-nowrap", className)} style={{ fontSize }}>
      {children}
    </span>
  );
}
