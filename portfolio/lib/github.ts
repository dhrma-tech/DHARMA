import "server-only";
import { site } from "@/data/site";
import { logError } from "@/lib/log";

export const GITHUB_REVALIDATE = 3600;
export const GITHUB_USER = new URL(site.socials.github).pathname.replace(/\//g, "");

export interface Commit {
  repo: string;
  message: string;
  url: string;
  /** ISO timestamp */
  date: string;
}

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string;
}

export interface GitHubActivity {
  commits: Commit[];
  repos: Repo[];
}

const COMMIT_LIMIT = 5;
const REPOS_TO_SCAN = 5;

async function gh<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: GITHUB_REVALIDATE } });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

interface ApiRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  private: boolean;
}

interface ApiCommit {
  html_url: string;
  commit: { message: string; author: { date: string } | null; committer: { date: string } | null };
}

/**
 * Latest public commits across the most recently pushed repos. Uses the repos +
 * commits endpoints rather than the events feed, which no longer carries commit
 * messages for push events. Cached for an hour; returns null if GitHub is unreachable.
 */
export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  try {
    const apiRepos = await gh<ApiRepo[]>(`/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=20`);
    const publicRepos = apiRepos.filter((r) => !r.fork && !r.private);

    const perRepo = await Promise.all(
      publicRepos.slice(0, REPOS_TO_SCAN).map(async (repo) => {
        try {
          const commits = await gh<ApiCommit[]>(`/repos/${repo.full_name}/commits?author=${GITHUB_USER}&per_page=${COMMIT_LIMIT}`);
          return commits.map((c) => ({
            repo: repo.name,
            message: c.commit.message.split("\n")[0].trim(),
            url: c.html_url,
            date: c.commit.author?.date ?? c.commit.committer?.date ?? repo.pushed_at,
          }));
        } catch (err) {
          // Empty repos return 409; one bad repo shouldn't hide the rest.
          logError("lib/github", "REPO_COMMITS", err);
          return [];
        }
      })
    );

    const commits = perRepo
      .flat()
      .filter((c) => c.message && !/^Merge (branch|pull request|remote-tracking)/.test(c.message))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, COMMIT_LIMIT);

    const repos = [...publicRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        pushedAt: r.pushed_at,
      }));

    return { commits, repos };
  } catch (err) {
    logError("lib/github", "FETCH", err);
    return null;
  }
}
