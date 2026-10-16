import Link from "next/link";

export default function Monogram() {
  return (
    <Link
      href="/"
      aria-label="Dharmaraj Aparadh — home"
      className="mr-6 shrink-0 font-serif text-[28px] font-normal italic leading-none tracking-[-0.01em] text-fg transition-opacity hover:opacity-70"
    >
      @dharma
    </Link>
  );
}
