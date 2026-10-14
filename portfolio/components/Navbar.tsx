"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
      className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-6"
    >
      <nav className="glass-dock rounded-2xl px-5 py-3 flex items-center gap-5 text-foreground border border-border/80">
        <Link href="/" aria-label="Home" className="hover:opacity-70 transition-opacity">
          <Home className="w-[18px] h-[18px]" strokeWidth={2} />
        </Link>
        <div className="w-[1px] h-5 bg-border/80 mx-1"></div>

        <Link href={site.socials.github} target="_blank" aria-label="GitHub" className="hover:opacity-70 transition-opacity">
          <FaGithub className="w-[18px] h-[18px]" />
        </Link>
        <Link href={site.socials.linkedin} target="_blank" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
          <FaLinkedin className="w-[18px] h-[18px]" />
        </Link>
        <Link href={site.socials.x} target="_blank" aria-label="X (Twitter)" className="hover:opacity-70 transition-opacity">
          <FaXTwitter className="w-[18px] h-[18px]" />
        </Link>

        <div className="w-[1px] h-5 bg-border/80 mx-1"></div>

        <ThemeToggle className="text-sm" />
      </nav>
    </motion.div>
  );
}
