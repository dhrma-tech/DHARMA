import Link from "next/link";
import type { Post } from "@/types/content";
import Section from "@/components/ui/Section";

/** Hidden entirely when there are no posts (spec §4). */
export default function Writing({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <Section id="writing" label="writing">
      <ul className="-mx-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex items-baseline justify-between gap-4 rounded px-3 py-2 transition-colors hover:bg-surface"
            >
              <span className="text-[16px] font-medium text-fg decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                {post.title}
              </span>
              <time dateTime={post.date} className="shrink-0 font-mono text-[13px] text-muted">
                {post.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
