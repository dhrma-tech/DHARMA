import Link from "next/link";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/60 max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-32 md:pb-12">
      <div className="flex gap-8 text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
        <Link href="#work" className="hover:text-foreground transition-colors">Work</Link>
        {profile.blog && profile.blog.length > 0 && (
          <Link href="#blog" className="hover:text-foreground transition-colors">Blog</Link>
        )}
      </div>
      
      <div className="text-xs font-semibold font-mono text-muted">
        &copy; {new Date().getFullYear()} {profile.name}.
      </div>
    </footer>
  );
}
