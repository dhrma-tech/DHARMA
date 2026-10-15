import { education } from "@/data/education";
import Section from "@/components/ui/Section";

export default function Education() {
  if (education.length === 0) return null;

  return (
    <Section id="education" label="education">
      <ul className="divide-y divide-subtle border-y border-subtle">
        {education.map((entry) => (
          <li key={entry.school} className="flex items-baseline justify-between gap-4 py-3">
            <div className="min-w-0">
              <p className="text-[16px] font-medium leading-snug text-fg">{entry.degree}</p>
              <p className="text-[15px] leading-snug text-muted">{entry.school}</p>
              {entry.detail && <p className="pt-1 text-[15px] text-muted">{entry.detail}</p>}
            </div>
            <span className="shrink-0 font-mono text-[13px] text-muted">{entry.dates}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
