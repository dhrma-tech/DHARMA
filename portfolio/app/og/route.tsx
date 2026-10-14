import { ogParamsFrom, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export function GET(request: Request) {
  return renderOgImage(ogParamsFrom(new URL(request.url).searchParams));
}
