import Link from "next/link";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/60 max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-32 md:pb-12">
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted" aria-label="Footer">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
        <Link href="#work" className="hover:text-foreground transition-colors">Work</Link>
        <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
        <Link href="#skills" className="hover:text-foreground transition-colors">Skills</Link>
        <Link href="#certifications" className="hover:text-foreground transition-colors">Certifications</Link>
        <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
      </nav>
      
      <div className="text-xs font-semibold font-mono text-muted">
        &copy; {new Date().getFullYear()} {profile.name}.
      </div>
    </footer>
  );
}
