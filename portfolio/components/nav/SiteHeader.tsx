"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";
import Monogram from "./Monogram";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useActiveSection } from "./useActiveSection";

/**
 * Two bars sharing one nav: the top bar sits over the hero, and a slim sticky
 * bar slides in once the hero has scrolled out of view.
 */
export default function SiteHeader({ items }: { items: NavItem[] }) {
  const sections = items.flatMap((item) => (item.section ? [item.section] : []));
  const active = useActiveSection(sections);
  const [pastHero, setPastHero] = useState(false);
  const reduceMotion = useReducedMotion();

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
          <NavLinks items={items} active={active} />
        </nav>
        <MobileMenu items={items} />
      </header>

      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={reduceMotion ? false : { y: -48 }}
            animate={{ y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: -48 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-subtle bg-bg px-6 sm:px-10"
          >
            <Monogram />
            <nav aria-label="Sticky" className="hidden md:block">
              <NavLinks items={items} active={active} className="gap-6" />
            </nav>
            <div className="flex items-center gap-6">
              <ThemeToggle className="hidden md:inline" />
              <MobileMenu items={items} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
