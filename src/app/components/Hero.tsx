import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6">
        <p className="text-green text-lg mb-4 font-mono">Hi, my name is</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate">
          Ali Firozmand.
        </h1>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate mt-2">
          I build things for the web.
        </h2>
        <p className="text-slate max-w-xl mt-6">
          I'm a front-end developer specializing in building exceptional digital
          experiences. Currently, I’m focused on building accessible,
          human-centered products with React and Next.js.
        </p>
        <a
          href="mailto:firozmand.dev@gmail.com"
          className="inline-block mt-12 px-8 py-4 border border-green text-green rounded hover:bg-green/10 transition-colors text-lg"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;
