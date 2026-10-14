import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import TextLink from "@/components/ui/TextLink";

/**
 * Placeholder for content I still need to write. Visible in `next dev`,
 * rendered as nothing in production builds.
 */
function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="my-4 border border-dashed border-accent px-4 py-3 font-mono text-[13px] text-fg">
      TODO: {children}
    </div>
  );
}

function Figure({ src, alt, width = 1280, height = 720 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <figure className="my-6">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full border border-subtle" />
      {alt && <figcaption className="mt-2 font-mono text-[13px] text-muted">{alt}</figcaption>}
    </figure>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mb-3 mt-12 font-mono text-[14px] font-normal lowercase text-muted" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mb-2 mt-8 text-[16px] font-medium text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-4 text-fg" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 list-disc space-y-2 pl-5 marker:text-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 marker:text-muted" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-medium text-fg" {...props} />,
  a: ({ href = "", children }: ComponentPropsWithoutRef<"a">) => <TextLink href={href} className="underline decoration-subtle hover:decoration-accent">{children}</TextLink>,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="border border-subtle bg-surface px-1 font-mono text-[14px]" {...props} />
  ),
  Todo,
  Figure,
};
