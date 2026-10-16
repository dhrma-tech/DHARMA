"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Touch screens have no hover, so the photo fades into colour on its own once the
// pop-in finishes, and a tap toggles it back and forth.
const TOUCH_REVEAL_DELAY_MS = 900;

export default function HeroPhoto({ alt, sizes, className }: { alt: string; sizes: string; className: string }) {
  const [touch, setTouch] = useState(false);
  const [color, setColor] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    setTouch(true);
    const id = window.setTimeout(() => setColor(true), TOUCH_REVEAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <span
      onClick={touch ? () => setColor((c) => !c) : undefined}
      className={cn("relative overflow-hidden bg-subtle animate-pop motion-reduce:animate-none", touch && "cursor-pointer", className)}
    >
      <Image
        src="/profile.jpeg"
        alt={alt}
        fill
        priority
        sizes={sizes}
        className={cn(
          "object-cover transition-[filter] motion-reduce:transition-none",
          touch ? "duration-700 ease-out" : "duration-150 group-hover:grayscale-0",
          color ? "grayscale-0" : "grayscale"
        )}
      />
    </span>
  );
}
