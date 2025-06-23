import React from "react";
import Image from "next/image";

const About = () => {
  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "HTML & CSS",
  ];

  return (
    <section id="about" className="py-24">
      <h2 className="text-2xl font-bold text-lightest-slate mb-8">
        <span className="text-green font-mono mr-2">01.</span>
        About Me
      </h2>
      <div className="lg:grid lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3 text-slate">
          <p className="mb-4">
            Hello! My name is Ali and I enjoy creating things that live on the
            internet. My interest in web development started back when I decided
            to build my first personal project — which taught me a lot about
            HTML & CSS!
          </p>
          <p className="mb-4">
            Fast-forward to today, and I’ve had the privilege of working on
            several exciting projects. My main focus these days is building
            accessible, inclusive products and digital experiences.
          </p>
          <p className="mb-8">
            Here are a few technologies I’ve been working with recently:
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono">
            {skills.map((skill, i) => (
              <li
                key={i}
                className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-green"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2 mt-12 lg:mt-0">
          <div className="relative group w-full max-w-xs mx-auto">
            <div className="absolute -inset-0.5 bg-green rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                className="w-full h-auto"
                src="/profile.jpg"
                alt="Headshot of Ali Firozmand"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
