import Link from "next/link";
import type { NavItem } from "@/lib/nav";
// clsx (not cn/tailwind-merge) in client components keeps twMerge out of the bundle.
import { clsx as cn } from "clsx";

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
    <ul className={cn("flex items-center", className)}>
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
