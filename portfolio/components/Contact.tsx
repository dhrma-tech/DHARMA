import { site } from "@/data/site";
import Section from "@/components/ui/Section";
import TextLink from "@/components/ui/TextLink";
import ContactForm from "@/components/contact/ContactForm";

const SOCIALS = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
  { label: "Resume", href: site.resumeUrl },
];

export default function Contact() {
  return (
    <Section id="contact" label="contact">
      <p className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-fg sm:text-5xl">
        Let&apos;s build something.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-6 inline-block break-all text-xl font-medium text-fg underline decoration-subtle decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-2xl"
      >
        {site.email}
      </a>

      <ContactForm />

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1">
        {SOCIALS.map((link) => (
          <li key={link.label}>
            <TextLink href={link.href}>{link.label}</TextLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
