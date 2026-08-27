"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { profile } from "../data/profile";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
      className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-6"
    >
      <nav className="glass-dock rounded-2xl px-5 py-3 flex items-center gap-5 text-foreground shadow-sm border border-border/80">
        <Link href="/" aria-label="Home" className="hover:opacity-70 transition-opacity">
          <Home className="w-[18px] h-[18px]" strokeWidth={2} />
        </Link>
        <div className="w-[1px] h-5 bg-border/80 mx-1"></div>

        <Link href={profile.github} target="_blank" aria-label="GitHub" className="hover:opacity-70 transition-opacity">
          <FaGithub className="w-[18px] h-[18px]" />
        </Link>
        <Link href={profile.linkedin} target="_blank" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
          <FaLinkedin className="w-[18px] h-[18px]" />
        </Link>
        <Link href={profile.twitter} target="_blank" aria-label="X (Twitter)" className="hover:opacity-70 transition-opacity">
          <FaXTwitter className="w-[18px] h-[18px]" />
        </Link>

        <div className="w-[1px] h-5 bg-border/80 mx-1"></div>

        <button onClick={toggleTheme} className="hover:opacity-70 transition-opacity focus:outline-none" aria-label="Toggle Dark Mode">
          {isDark ? (
            <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
          ) : (
            <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
          )}
        </button>
      </nav>
    </motion.div>
  );
}
