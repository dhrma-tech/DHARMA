import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProject } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import TextLink from "@/components/ui/TextLink";
import PageHeader from "@/components/nav/PageHeader";
import ViewCounter from "@/components/ViewCounter";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { OG_SIZE, ogImageUrl } from "@/lib/og";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getProject(params.slug);
  if (!entry) return {};
  const { project } = entry;
  const image = {
    url: ogImageUrl({
      title: project.title,
      subtitle: project.summary,
      eyebrow: `${project.year} · ${project.stack.slice(0, 3).join(" · ")}`,
    }),
    ...OG_SIZE,
    alt: `${project.title} — ${project.summary}`,
  };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.description, images: [image] },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const entry = getProject(params.slug);
  if (!entry) notFound();
  const { project, body } = entry;

  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  const links = [
    project.live && { label: "Live site", href: project.live },
    project.repo && { label: "Source on GitHub", href: project.repo },
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  return (
    <>
      <PageHeader />

      <main id="main" className="mx-auto max-w-[640px] px-6 pb-16 pt-10">
        <Link href="/#projects" className="text-[15px] text-muted decoration-accent decoration-2 underline-offset-4 hover:text-fg hover:underline">
          ← all projects
        </Link>

        <article className="mt-10">
          <header>
            <h1 className="break-words font-display text-4xl font-extrabold sm:text-5xl leading-[0.95] tracking-[-0.04em] text-fg">
              {project.title}
            </h1>
            <p className="mt-4 text-[17px] text-fg">{project.description}</p>
            <p className="mt-4 font-mono text-[13px] text-muted">
              {project.dates} · {project.status} · {project.stack.join(" · ")}
              <ViewCounter slug={project.slug} />
            </p>
          </header>

          <MDXRemote source={body} components={mdxComponents} />

          <section aria-labelledby="links-heading">
            <h2 id="links-heading" className="mb-3 mt-12 font-mono text-[14px] text-muted">
              links
            </h2>
            {links.length > 0 ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <TextLink href={l.href}>{l.label} →</TextLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">{project.private ? "Private repository." : "No public links yet."}</p>
            )}
          </section>
        </article>

        <nav aria-label="More projects" className="mt-16 grid grid-cols-2 gap-4 border-t border-subtle pt-6">
          <div>
            {prev && (
              <Link href={`/projects/${prev.slug}`} className="group block">
                <span className="block font-mono text-[13px] text-muted">← previous</span>
                <span className="text-[16px] font-medium text-fg decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/projects/${next.slug}`} className="group block">
                <span className="block font-mono text-[13px] text-muted">next →</span>
                <span className="text-[16px] font-medium text-fg decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}
