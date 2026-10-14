import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-[640px] flex-col justify-center px-6">
      <p className="font-mono text-[14px] text-muted">404</p>
      <h1 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.04em] text-fg">Page not found</h1>
      <p className="mt-4 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-6 w-fit text-fg decoration-accent decoration-2 underline-offset-4 hover:underline"
      >
        ← back home
      </Link>
    </main>
  );
}
