import Link from "next/link";
import type { NavItem } from "@/lib/nav";
import { cn } from "@/lib/cn";

export default function NavLinks({
  items,
  active,
  className,
}: {
  items: NavItem[];
  active: string | null;
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-7", className)}>
      {items.map((item) => {
        const isActive = item.section !== undefined && item.section === active;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "text-[15px] font-medium text-fg underline-offset-[6px] decoration-2 decoration-accent transition-colors hover:underline",
                isActive && "underline"
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
