"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[800px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex flex-col md:flex-row gap-8 md:gap-24"
      >
        <div className="w-full md:w-[120px] shrink-0">
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mt-2">
            ABOUT
          </h3>
        </div>
        
        <div className="w-full space-y-12 relative">
          <p className="text-2xl md:text-[28px] text-foreground leading-[1.4] font-medium tracking-tight">
            {profile.bio}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <div className="text-4xl font-bold text-foreground">{profile.yearsExperience} <span className="text-3xl">+</span></div>
              <div className="text-xs font-semibold text-muted tracking-wide">Years Experience</div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-muted tracking-wide mb-1">Location</div>
              <div className="text-sm font-bold text-foreground">{profile.location}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-muted tracking-wide mb-1">Focus</div>
              <div className="text-sm font-bold text-foreground">{profile.focus}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
