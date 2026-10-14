import { experience } from "@/data/experience";
import Section from "@/components/ui/Section";

/**
 * Rows grouped by org. Each role is a native <details> accordion, so it's
 * keyboard-operable (Enter/Space on the summary) without client JS.
 */
export default function WorkExperience() {
  return (
    <Section id="work" label="work">
      <ul className="divide-y divide-subtle border-y border-subtle">
        {experience.map((entry) => (
          <li key={entry.org} className="py-2">
            {entry.roles.map((role, i) => (
              <details key={role.title} className="group">
                <summary className="-mx-3 flex cursor-pointer list-none items-baseline justify-between gap-4 rounded px-3 py-2 transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">
                    <span className="block text-[16px] font-medium leading-snug text-fg">{role.title}</span>
                    {i === 0 && <span className="block text-[15px] leading-snug text-muted">{entry.org}</span>}
                  </span>
                  <span className="shrink-0 font-mono text-[13px] text-muted">
                    {role.dates}
                    <span aria-hidden="true" className="ml-2 inline-block transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="pb-3 pr-8 pt-1 text-[15px] text-muted">{role.description}</p>
              </details>
            ))}
          </li>
        ))}
      </ul>
    </Section>
  );
}
