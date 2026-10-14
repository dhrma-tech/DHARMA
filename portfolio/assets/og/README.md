Fonts used only by `lib/og.tsx` to render Open Graph images on the Edge runtime.

- Inter Tight 800, Inter 500, Geist Mono 400 — static TTFs from Google Fonts, subset to
  printable ASCII plus `· — – … → ← ’ ‘ “ ”` to keep the Edge bundle small.
  Licensed under the SIL Open Font License 1.1.
- Characters outside that set won't render in OG images; re-download with a wider
  `&text=` subset if titles need them.
