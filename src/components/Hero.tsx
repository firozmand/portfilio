import Image from "next/image";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiDownload,
  FiMapPin,
} from "react-icons/fi";
import {
  personalDetails,
  portfolioProfile,
} from "@/lib/portfolio";

export default function Hero() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="hero-copy">
        <div className="availability-pill">
          <span className="availability-dot" aria-hidden="true" />
          Available for ambitious front-end work
        </div>

        <p className="eyebrow">Front-End Developer · Isfahan, Iran</p>
        <h1 id="hero-title" className="hero-title">
          I build digital products that feel
          <span> fast, clear, and alive.</span>
        </h1>
        <p className="hero-intro">
          I&apos;m <strong>{portfolioProfile.fullName}</strong>, a front-end
          developer with 4+ years of experience turning complex product ideas
          into scalable, high-performance experiences with Next.js, React, and
          TypeScript.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore selected work
            <FiArrowDownRight aria-hidden="true" />
          </a>
          <a
            className="button button-secondary"
            href={portfolioProfile.resumeUrl ?? "/resume.pdf"}
            download="Ali-Firozmand-Resume.pdf"
          >
            <FiDownload aria-hidden="true" />
            Download résumé
          </a>
        </div>

        <div className="hero-links" aria-label="Professional links">
          <a
            href={personalDetails.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={personalDetails.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <FiArrowUpRight aria-hidden="true" />
          </a>
          <span>
            <FiMapPin aria-hidden="true" /> {personalDetails.location}
          </span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="portrait-frame">
          <div className="portrait-index" aria-hidden="true">
            01 / AF
          </div>
          <Image
            src="/profile.jpg"
            alt="Portrait of Ali Firozmand"
            width={640}
            height={640}
            priority
            sizes="(max-width: 900px) 78vw, 38vw"
            className="portrait-image"
          />
          <div className="portrait-caption">
            <span>Product-minded engineering</span>
            <span>2020 — now</span>
          </div>
        </div>

        <div className="hero-stat hero-stat-years">
          <strong>4+</strong>
          <span>years shipping for the web</span>
        </div>
        <div className="hero-stat hero-stat-focus">
          <span className="stat-label">Current focus</span>
          <strong>Fast, scalable front ends</strong>
        </div>
      </div>
    </section>
  );
}
