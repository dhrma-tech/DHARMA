import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted font-bold">404</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="text-foreground/70 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-[10px] bg-foreground text-background hover:opacity-90 transition-opacity text-sm font-semibold"
      >
        Back to home
      </Link>
    </main>
  );
}
