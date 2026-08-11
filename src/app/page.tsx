import About from "../components/About";
import Hero from "../components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import SectionWrapper from "@/components/SectionWrapper";

// Admin mutations should be visible immediately without requiring a redeploy.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main
      id="main"
      className="portfolio-main mx-auto max-w-screen-2xl space-y-16 px-5 pb-16 pt-32 sm:px-8 lg:px-12 xl:px-16"
    >
      <Hero />
      <SectionWrapper>
        <About />
      </SectionWrapper>
      <SectionWrapper>
        <Experience />
      </SectionWrapper>
      {/* Projects can grow taller than the viewport, so keep this critical
          content independent from viewport-triggered animation wrappers. */}
      <Projects />
      <SectionWrapper>
        <Contact />
      </SectionWrapper>
      <Footer />
    </main>
  );
}
