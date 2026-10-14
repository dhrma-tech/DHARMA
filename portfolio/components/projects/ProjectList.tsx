"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project, ProjectCategory } from "@/types/content";
// clsx (not cn/tailwind-merge) in client components keeps twMerge out of the bundle.
import { clsx as cn } from "clsx";

type Filter = "All" | ProjectCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "AI", label: "AI & Workflows" },
  { value: "Web", label: "Web" },
];

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-4 flex flex-wrap items-center gap-x-2 text-[14px]">
        {FILTERS.map((f, i) => (
          <span key={f.value} className="flex items-center gap-x-2">
            {i > 0 && <span aria-hidden="true" className="text-muted">·</span>}
            <button
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-fg",
                filter === f.value ? "text-fg underline" : "text-muted"
              )}
            >
              {f.label}
            </button>
          </span>
        ))}
      </div>

      <ul className="-mx-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block rounded px-3 py-3 transition-colors hover:bg-surface focus-visible:bg-surface"
            >
              <span className="flex items-baseline gap-4">
                <span className="min-w-0 flex-1 text-[16px] font-medium text-fg [overflow-wrap:anywhere] sm:w-52 sm:flex-none">{project.title}</span>
                <span className="hidden min-w-0 flex-1 truncate text-[15px] text-muted sm:block">{project.summary}</span>
                <span className="shrink-0 font-mono text-[13px] text-muted">
                  {project.year}{" "}
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    →
                  </span>
                </span>
              </span>
              {/* Detail line: always shown on touch-size screens, revealed on hover/focus above sm. */}
              <span className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-200 sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] sm:group-focus-visible:grid-rows-[1fr]">
                <span className="overflow-hidden">
                  <span className="block pt-1 text-[14px] text-muted sm:truncate">{project.description}</span>
                  <span className="block pt-1 font-mono text-[13px] text-muted">{project.stack.join(" · ")}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
