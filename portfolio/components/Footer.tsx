import { site } from "@/data/site";

// Evaluated at build time — the home page is statically generated.
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const YEAR = BUILD_DATE.slice(0, 4);

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[640px] border-t border-subtle px-6 py-10 font-mono text-[13px] text-muted">
      <p>
        © {YEAR} {site.name} · Built with Claude Code · Last updated{" "}
        <time dateTime={BUILD_DATE}>{BUILD_DATE}</time>
      </p>
    </footer>
  );
}
