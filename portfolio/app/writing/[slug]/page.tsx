import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import PageHeader from "@/components/nav/PageHeader";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { OG_SIZE, ogImageUrl } from "@/lib/og";
import ViewCounter from "@/components/ViewCounter";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getPost(params.slug);
  if (!entry) return {};
  const { post } = entry;
  const image = { url: ogImageUrl({ title: post.title, subtitle: post.summary, eyebrow: post.date }), ...OG_SIZE, alt: post.title };
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: post.title,
      description: post.summary,
      url: `/writing/${post.slug}`,
      publishedTime: post.date,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [image] },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const entry = getPost(params.slug);
  if (!entry) notFound();
  const { post, body } = entry;

  return (
    <>
      <PageHeader />
      <main id="main" className="mx-auto max-w-[640px] px-6 pb-16 pt-10">
        <Link href="/#writing" className="text-[15px] text-muted decoration-accent decoration-2 underline-offset-4 hover:text-fg hover:underline">
          ← all writing
        </Link>
        <article className="mt-10">
          <header>
            <h1 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.04em] text-fg sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 font-mono text-[13px] text-muted">
              <time dateTime={post.date}>{post.date}</time>
              <ViewCounter slug={post.slug} />
            </p>
          </header>
          <MDXRemote source={body} components={mdxComponents} />
        </article>
      </main>
      <Footer />
    </>
  );
}
