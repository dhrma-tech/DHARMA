import SiteHeader from "@/components/nav/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
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
        <WorkExperience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
