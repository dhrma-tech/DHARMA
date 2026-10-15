import type { NowData } from "@/lib/now";
import Section from "@/components/ui/Section";
import { getGitHubActivity } from "@/lib/github";
import { relativeTime } from "@/lib/time";

export default async function Now({ now }: { now: NowData }) {
  const activity = await getGitHubActivity();
  const commits = activity?.commits ?? [];

  return (
    <Section id="now" label="now">
      <ul className="list-disc space-y-2 pl-5 marker:text-muted">
        {now.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[13px] text-muted">
        Updated: <time dateTime={now.updated}>{now.updated}</time>
      </p>

      {commits.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 font-mono text-[13px] text-muted">recently shipped</h3>
          <ul className="space-y-2">
            {commits.map((c) => (
              <li key={c.url} className="flex items-baseline gap-3 text-[15px]">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 truncate text-fg decoration-accent decoration-2 underline-offset-4 hover:underline"
                >
                  <span className="text-muted">{c.repo} · </span>
                  {c.message}
                </a>
                <time dateTime={c.date} className="shrink-0 font-mono text-[13px] text-muted">
                  {relativeTime(c.date)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
