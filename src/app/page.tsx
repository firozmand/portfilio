import About from "../components/About";
import Hero from "../components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <Hero />
      <About />
      <Experience />
      <Projects />
      {/* Other sections will go here later */}
    </main>
  );
}
