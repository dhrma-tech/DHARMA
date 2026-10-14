export interface NavItem {
  label: string;
  href: string;
  /** Section id used for active-state tracking; absent for page links. */
  section?: string;
}

const ALL_ITEMS: NavItem[] = [
  { label: "About", href: "#about", section: "about" },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Work", href: "#work", section: "work" },
  { label: "Writing", href: "#writing", section: "writing" },
  { label: "Stack", href: "#stack", section: "stack" },
  { label: "Contact", href: "#contact", section: "contact" },
  { label: "Resume", href: "/resume" },
];

/** Writing is hidden until at least one post exists (spec §4). */
export function getNavItems({ hasWriting }: { hasWriting: boolean }): NavItem[] {
  return ALL_ITEMS.filter((item) => hasWriting || item.section !== "writing");
}
