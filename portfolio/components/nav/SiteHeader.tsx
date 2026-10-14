"use client";

import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";
import Monogram from "./Monogram";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useActiveSection } from "./useActiveSection";
// clsx (not cn/tailwind-merge) in client components keeps twMerge out of the bundle.
import { clsx as cn } from "clsx";

/**
 * Two bars sharing one nav: the top bar sits over the hero, and a slim sticky
 * bar slides in once the hero has scrolled out of view.
 */
export default function SiteHeader({ items }: { items: NavItem[] }) {
  const sections = items.flatMap((item) => (item.section ? [item.section] : []));
  const active = useActiveSection(sections);
  const [pastHero, setPastHero] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  // React 18 has no `inert` prop, so set it on the element directly.
  useEffect(() => {
    if (stickyRef.current) stickyRef.current.inert = !pastHero;
  }, [pastHero]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      rootMargin: "-48px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
        <Monogram />
        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={items} active={active} className="gap-7" />
        </nav>
        <MobileMenu items={items} />
      </header>

      {/* Always mounted; slid out of view and made inert until the hero has scrolled past. */}
      <div
        ref={stickyRef}
        aria-hidden={!pastHero || undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-subtle bg-bg px-6 transition-transform duration-200 ease-out motion-reduce:transition-none sm:px-10",
          !pastHero && "-translate-y-full"
        )}
      >
        <Monogram />
        <nav aria-label="Sticky" className="hidden md:block">
          <NavLinks items={items} active={active} className="gap-6" />
        </nav>
        <div className="flex items-center gap-6">
          <ThemeToggle className="hidden md:inline" />
          <MobileMenu items={items} />
        </div>
      </div>
    </>
  );
}
