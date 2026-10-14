import { now } from "@/data/now";
import Section from "@/components/ui/Section";

export default function Now() {
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
    </Section>
  );
}
