import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts, getAllProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projects = getAllProjects().map((p) => ({
    url: `${site.siteUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.8 : 0.5,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${site.siteUrl}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    { url: site.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...projects,
    ...posts,
  ];
}
