"use client";

import About from "../components/About";
import Hero from "../components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
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
