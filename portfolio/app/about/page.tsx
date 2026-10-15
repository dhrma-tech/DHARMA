import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import PageHeader from "@/components/nav/PageHeader";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { OG_SIZE, ogImageUrl } from "@/lib/og";

const TITLE = "Dharma, so far.";
const DESCRIPTION = `The long version: how ${site.name} went from a village in Kolhapur to building AI products.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    images: [{ url: ogImageUrl({ title: TITLE, subtitle: DESCRIPTION }), ...OG_SIZE, alt: TITLE }],
  },
};

export default function AboutPage() {
  const body = fs.readFileSync(path.join(process.cwd(), "content", "bio.mdx"), "utf8");

  return (
    <>
      <PageHeader />
      <main id="main" className="mx-auto max-w-[640px] px-6 pb-16 pt-10">
        <Link href="/#about" className="text-[15px] text-muted decoration-accent decoration-2 underline-offset-4 hover:text-fg hover:underline">
          ← home
        </Link>
        <article className="mt-10">
          <header>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-fg sm:text-5xl">
              Dharma, so far.
            </h1>
          </header>
          <div className="mt-8">
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
