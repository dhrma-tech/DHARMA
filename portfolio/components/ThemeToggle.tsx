"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// clsx (not cn/tailwind-merge) in client components keeps twMerge out of the bundle.
import { clsx as cn } from "clsx";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  // Before mount the theme is unknown on the server; render a stable placeholder width.
  const label = mounted ? (isDark ? "Dark" : "Light") : "     ";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={cn("text-[15px] font-medium text-fg hover:text-accent transition-colors", className)}
    >
      Theme: {label}
    </button>
  );
}
