import { site } from "@/data/site";

// Evaluated at build time — the home page is statically generated.
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const YEAR = BUILD_DATE.slice(0, 4);

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[640px] px-6 font-mono text-[13px] text-muted">
      <p className="border-t border-subtle py-10">
        © {YEAR} {site.name} · Built with Claude Code · Last updated{" "}
        <time dateTime={BUILD_DATE}>{BUILD_DATE}</time>
      </p>
    </footer>
  );
}
