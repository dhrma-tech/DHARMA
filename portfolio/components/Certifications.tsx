import Image from "next/image";
import { certifications } from "@/data/certifications";
import Section from "@/components/ui/Section";
import TextLink from "@/components/ui/TextLink";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications" label="certifications">
      <ul className="divide-y divide-subtle border-y border-subtle">
        {certifications.map((cert) => (
          <li key={cert.name} className="flex items-baseline justify-between gap-4 py-3">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[16px] font-medium leading-snug text-fg">
                {cert.logo && (
                  <Image src={cert.logo} alt="" width={16} height={16} className="h-4 w-4 shrink-0 object-contain" />
                )}
                {cert.name}
              </p>
              <p className="text-[15px] text-muted">{cert.issuer}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1 font-mono text-[13px] text-muted sm:flex-row sm:items-baseline sm:gap-4">
              <span>{cert.date}</span>
              {cert.url && (
                <TextLink href={cert.url} className="font-sans text-[14px]">
                  Verify →<span className="sr-only"> {cert.name} certificate (opens in new tab)</span>
                </TextLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
