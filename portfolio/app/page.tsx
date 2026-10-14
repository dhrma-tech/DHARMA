import SiteHeader from "@/components/nav/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Now from "@/components/Now";
import Stack from "@/components/Stack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getNavItems } from "@/lib/nav";

export default function Home() {
  // TODO(phase 5): derive from content/writing once the Writing section exists.
  const navItems = getNavItems({ hasWriting: false });

  return (
    <>
      <SiteHeader items={navItems} />
      <main id="main" className="min-h-screen">
        <Hero />
        <About />
        <Now />
        <Projects />
        <WorkExperience />
        {/* Writing — phase 5 */}
        <Stack />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
