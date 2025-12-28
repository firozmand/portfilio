import About from "../components/About";
import Hero from "../components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-16 space-y-16">
      <Hero />
      <SectionWrapper>
        <About />
      </SectionWrapper>
      <SectionWrapper>
        <Experience />
      </SectionWrapper>
      <SectionWrapper>
        <Projects />
      </SectionWrapper>
      <SectionWrapper>
        <Contact />
      </SectionWrapper>
      <Footer />
    </main>
  );
}
