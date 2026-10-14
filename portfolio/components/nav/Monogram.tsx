import Link from "next/link";

export default function Monogram() {
  return (
    <Link
      href="/"
      aria-label="Dharmaraj Aparadh — home"
      className="inline-flex h-8 w-8 shrink-0 -rotate-12 items-center justify-center rounded-full border border-fg font-display text-[11px] font-extrabold tracking-tight text-fg transition-transform hover:rotate-0"
    >
      DA
    </Link>
  );
}
