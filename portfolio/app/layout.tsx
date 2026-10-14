import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  variable: "--font-display",
});

// Geist Mono isn't in next/font/google on Next 14, so it's self-hosted (SIL OFL, see app/fonts).
const geistMono = localFont({
  src: "./fonts/GeistMono-Regular.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-mono",
});

const title = `${site.name} | ${site.role}`;
const description = `${site.tagline}. ${site.role} and Mechatronics Engineering student building AI-native products with Claude Code — portfolio, projects, and work experience.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    site.name,
    "AI Product Engineer",
    "Mechatronics Engineering",
    "Claude Code",
    "AI-assisted development",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: site.name,
    images: [{ url: "/profile.jpeg", width: 800, height: 800, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.siteUrl,
  image: `${site.siteUrl}/profile.jpeg`,
  jobTitle: site.role,
  description: site.tagline,
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.x],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${interTight.variable} ${geistMono.variable} font-sans selection:bg-fg/10`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
