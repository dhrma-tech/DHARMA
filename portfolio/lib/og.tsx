import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 };

// Light-theme tokens (spec §1).
const BG = "#FAFAF9";
const FG = "#0A0A0A";
const MUTED = "#737373";
const SUBTLE = "#E7E5E4";
const ACCENT = "#FF4F00";

// Loaded via import.meta.url so this works in the Edge runtime. (The Node build of
// next/og in Next 14 can't resolve its own assets on Windows, so OG routes run on Edge.)
const FONTS = {
  display: new URL("../assets/og/inter-tight-800.ttf", import.meta.url),
  body: new URL("../assets/og/inter-500.ttf", import.meta.url),
  mono: new URL("../assets/og/geist-mono-400.ttf", import.meta.url),
};
const loadFont = (url: URL) => fetch(url).then((res) => res.arrayBuffer());

const MAX = { title: 60, subtitle: 160, eyebrow: 60 };
const clamp = (value: string | null | undefined, max: number) =>
  value ? (value.length > max ? `${value.slice(0, max - 1)}…` : value) : undefined;

/** URL of the dynamic /og image for pages whose content lives in MDX (read at build time). */
export function ogImageUrl({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/og?${params.toString()}`;
}

/** Parses and length-limits /og query params so the endpoint can't render arbitrary essays. */
export function ogParamsFrom(searchParams: URLSearchParams) {
  return {
    title: clamp(searchParams.get("title"), MAX.title) ?? site.shortName,
    subtitle: clamp(searchParams.get("subtitle"), MAX.subtitle),
    eyebrow: clamp(searchParams.get("eyebrow"), MAX.eyebrow),
  };
}

/** Renders a 1200×630 card: big display title, optional subtitle, mono footer. */
export async function renderOgImage({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  const [display, body, mono] = await Promise.all([
    loadFont(FONTS.display),
    loadFont(FONTS.body),
    loadFont(FONTS.mono),
  ]);

  const titleSize = title.length > 18 ? 104 : 136;
  const host = new URL(site.siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: FG,
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              border: `2px solid ${FG}`,
              fontFamily: "Inter Tight",
              fontSize: 20,
              transform: "rotate(-12deg)",
            }}
          >
            DA
          </div>
          {eyebrow && <div style={{ fontFamily: "Geist Mono", fontSize: 24, color: MUTED }}>{eyebrow}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Inter Tight",
              fontSize: titleSize,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              maxWidth: 1056,
              wordBreak: "break-word",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.3, color: FG, maxWidth: 960 }}>{subtitle}</div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${SUBTLE}`,
            paddingTop: 24,
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: ACCENT }} />
            <div style={{ color: FG }}>{site.availability}</div>
          </div>
          <div>{host}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter Tight", data: display, weight: 800, style: "normal" },
        { name: "Inter", data: body, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
