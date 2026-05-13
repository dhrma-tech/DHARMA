"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";

export default function Certifications() {
  if (!profile.certifications || profile.certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 max-w-4xl mx-auto border-t border-border/60">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mb-10">
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mb-4">
            PROFESSIONAL DEVELOPMENT
          </h3>
          <h2 className="text-4xl md:text-[44px] font-bold tracking-tight text-foreground">
            Certifications
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.certifications.map((cert: any, index: number) => (
            <div key={index} className="flex flex-col p-8 rounded-[20px] bg-surface hover:shadow-sm border border-transparent hover:border-border transition-all h-full min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-[#0a66c2] flex items-center justify-center shrink-0 text-white shadow-sm mb-6">
                {/* Temporary fallback to a letter if no specific icon system is used */}
                <span className="font-bold text-xl">{cert.name ? cert.name.charAt(0) : "C"}</span>
              </div>
              
              <h4 className="font-medium text-foreground text-xl leading-snug mb-3 pr-4">{cert.name}</h4>
              
              <div className="text-[15px] text-foreground/70 mb-2">{cert.issuer}</div>
              
              <div className="text-[13px] text-foreground/60 mb-6">{cert.date}</div>
              
              <div className="flex-grow"></div>
              
              {cert.url && (
                <a href={cert.url} target="_blank" rel="noreferrer" className="text-[13px] font-medium text-accent hover:opacity-80 transition-opacity inline-block">
                  View Certificate &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
