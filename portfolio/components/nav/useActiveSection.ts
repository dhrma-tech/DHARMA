"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elements.forEach((el) => observer.observe(el));

    const hero = document.getElementById("hero");
    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => {
          if (entry.intersectionRatio > 0.5) setActive(null);
        }, { threshold: [0.5] })
      : null;
    if (hero) heroObserver?.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
    };
  }, [key]);

  return active;
}
