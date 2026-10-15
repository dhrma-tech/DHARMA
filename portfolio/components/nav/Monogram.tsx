import Link from "next/link";

export default function Monogram() {
  return (
    <Link
      href="/"
      aria-label="Dharmaraj Aparadh — home"
      className="mr-6 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fg font-display text-base font-extrabold leading-none text-fg transition-colors hover:bg-fg hover:text-bg"
    >
      D
    </Link>
  );
}
