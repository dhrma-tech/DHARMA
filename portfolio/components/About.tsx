import { site } from "@/data/site";
import Section from "@/components/ui/Section";
import TextLink from "@/components/ui/TextLink";

const LINKS = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
  { label: "Email", href: `mailto:${site.email}` },
];

export default function About() {
  return (
    <Section id="about" label="about">
      <p className="text-fg">{site.about}</p>
      <p className="mt-4">
        <TextLink href="/about" className="underline decoration-subtle hover:decoration-accent">
          Still curious? →
        </TextLink>
      </p>
      <p className="mt-4 font-mono text-[13px] text-muted">
        {site.location} · {site.college} · {site.discipline}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {LINKS.map((link) => (
          <li key={link.label}>
            <TextLink href={link.href}>{link.label}</TextLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
