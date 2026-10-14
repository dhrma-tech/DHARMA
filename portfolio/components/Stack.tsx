import { stack } from "@/data/stack";
import Section from "@/components/ui/Section";

export default function Stack() {
  return (
    <Section id="stack" label="stack">
      <dl className="space-y-3">
        {stack.map((group) => (
          <div key={group.label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="w-28 shrink-0 text-[16px] font-medium text-fg">{group.label}</dt>
            <dd className="font-mono text-[14px] leading-7 text-muted">
              {group.items.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  <span className="text-fg">{item}</span>
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
