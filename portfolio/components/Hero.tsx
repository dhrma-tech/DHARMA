"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto flex flex-col justify-center min-h-[85vh]">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col md:flex-row justify-between items-center gap-16">
        
        <div className="space-y-8 flex-1">
          <motion.div variants={item}>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted font-bold mb-6">
              END-TO-END AI • 0&rarr;1 PRODUCTS • AI PRODUCT ENGINEERING
            </p>
            <h1 className="text-[12vw] md:text-7xl lg:text-[90px] font-bold tracking-[-0.04em] leading-[1] text-foreground mb-4">
              {profile.name}
            </h1>
            <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-foreground/70">
              {profile.tagline}
            </h2>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              href={`mailto:${profile.email}`}
              className="px-6 py-2.5 rounded-[10px] bg-foreground text-background hover:opacity-90 transition-opacity flex items-center justify-center text-sm font-semibold min-w-[140px]"
            >
              Get in Touch
            </Link>
            <Link 
              href="#"
              className="px-6 py-2.5 rounded-[10px] border border-border bg-transparent hover:bg-foreground/5 transition-colors flex items-center justify-center text-sm font-semibold text-foreground min-w-[140px]"
            >
              View Resume
            </Link>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-6 pt-4 text-muted">
            <Link href={profile.github} target="_blank" className="hover:text-foreground transition-colors">
              <FaGithub className="w-[22px] h-[22px]" />
            </Link>
            <Link href={profile.linkedin} target="_blank" className="hover:text-foreground transition-colors">
              <FaLinkedin className="w-[22px] h-[22px]" />
            </Link>
            <Link href={profile.twitter} target="_blank" className="hover:text-foreground transition-colors">
              <FaXTwitter className="w-[22px] h-[22px]" />
            </Link>
          </motion.div>
        </div>

        <motion.div variants={item} className="w-full md:w-[400px] shrink-0 flex justify-center md:justify-end">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden border border-black/5">
            {/* Using a placeholder similar to the reference image */}
            <Image 
              src="/profile.jpeg" 
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
