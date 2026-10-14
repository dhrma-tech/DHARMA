import type { Metadata } from "next";
import SiteHeader from "@/components/nav/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Now from "@/components/Now";
import Writing from "@/components/Writing";
import Stack from "@/components/Stack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getNavItems } from "@/lib/nav";
import { getAllPosts } from "@/lib/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.siteUrl,
  image: `${site.siteUrl}/profile.jpeg`,
  jobTitle: site.role,
  description: site.tagline,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Ratnagiri", addressRegion: "Maharashtra", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Government College of Engineering, Ratnagiri" },
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.x],
};

export default function Home() {
  const posts = getAllPosts();
  const navItems = getNavItems({ hasWriting: posts.length > 0 });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <SiteHeader items={navItems} />
      <main id="main" className="min-h-screen">
        <Hero />
        <About />
        <Now />
        <Projects />
        <WorkExperience />
        <Writing posts={posts} />
        <Stack />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
