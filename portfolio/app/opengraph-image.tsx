import { site } from "@/data/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";
export const alt = `${site.shortName} — ${site.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: site.shortName, subtitle: site.positioning });
}
