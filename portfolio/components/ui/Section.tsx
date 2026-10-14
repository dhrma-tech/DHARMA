import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** leerob-style section: narrow column, lowercase mono label as the h2. */
export default function Section({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("mx-auto max-w-[640px] px-6 py-12 md:py-16", className)}>
      <h2 id={headingId} className="mb-6 font-mono text-[14px] text-muted">
        {label}
      </h2>
      {children}
    </section>
  );
}
