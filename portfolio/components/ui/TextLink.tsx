import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Plain inline link: underline in accent on hover. External URLs open in a new tab. */
export default function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "text-fg decoration-accent decoration-2 underline-offset-4 transition-colors hover:underline",
        className
      )}
    >
      {children}
    </a>
  );
}
