"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { useState } from "react";

export default function Skills() {
  return (
    <section id="skills" className="py-24 overflow-hidden max-w-[100vw]">
      <div className="max-w-4xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-8 md:gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full md:w-1/4 shrink-0"
        >
          <h3 className="text-[11px] uppercase tracking-[0.15em] text-muted font-bold mt-2">
            Technical Expertise
          </h3>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <MarqueeRow items={profile.skills.domain} direction="left" />
        <MarqueeRow items={profile.skills.languages} direction="right" />
        <MarqueeRow items={profile.skills.tools} direction="left" />
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction }: { items: string[], direction: "left" | "right" }) {
  const [paused, setPaused] = useState(false);
  const scrollItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="flex whitespace-nowrap overflow-hidden group"
      onClick={() => setPaused((p) => !p)}
      role="list"
      aria-label="Scrolling list of skills, tap to pause"
    >
      <div
        className="flex gap-4 animate-scroll hover:[animation-play-state:paused] w-max"
        style={{
          animationDirection: direction === "right" ? "reverse" : undefined,
          animationPlayState: paused ? "paused" : undefined,
        }}
      >
        {scrollItems.map((item, idx) => (
          <div
            key={idx}
            role="listitem"
            className="px-5 py-2.5 rounded-full border border-border bg-surface font-mono text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-border/50 hover:shadow-sm transition-all"
          >
            {item.toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
