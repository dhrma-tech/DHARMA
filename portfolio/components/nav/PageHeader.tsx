import Monogram from "./Monogram";
import ThemeToggle from "@/components/ThemeToggle";

/** Minimal top bar for detail pages (case studies, posts). */
export default function PageHeader() {
  return (
    <header className="mx-auto flex h-14 max-w-[640px] items-center justify-between px-6">
      <Monogram />
      <ThemeToggle />
    </header>
  );
}
