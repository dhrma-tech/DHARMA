"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-border/60">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex flex-col md:flex-row gap-8 md:gap-12"
      >
        <div className="w-full md:w-1/4 shrink-0">
          <h3 className="text-[11px] uppercase tracking-[0.15em] text-muted font-bold mt-2">
            Let&apos;s Connect
          </h3>
        </div>
        
        <div className="w-full md:w-3/4 flex flex-col gap-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Get in touch.</h2>
            <p className="text-foreground/80 text-lg leading-relaxed max-w-xl font-medium">
              Always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>

          <div className="flex flex-col gap-5 w-fit">
            <Link 
              href={`mailto:${profile.email}`} 
              className="flex items-center gap-4 text-foreground/80 hover:text-foreground font-semibold transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <span>{profile.email}</span>
            </Link>
            <Link 
              href={profile.github} target="_blank"
              className="flex items-center gap-4 text-foreground/80 hover:text-foreground font-semibold transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                <FaGithub className="w-4 h-4" />
              </div>
              <span>GitHub</span>
            </Link>
            <Link 
              href={profile.linkedin} target="_blank"
              className="flex items-center gap-4 text-foreground/80 hover:text-foreground font-semibold transition-colors group"
            >
               <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                <FaLinkedin className="w-4 h-4" />
              </div>
              <span>LinkedIn</span>
            </Link>
            <Link 
              href={profile.twitter} target="_blank"
              className="flex items-center gap-4 text-foreground/80 hover:text-foreground font-semibold transition-colors group"
            >
               <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                <FaXTwitter className="w-4 h-4" />
              </div>
              <span>X (Twitter)</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
