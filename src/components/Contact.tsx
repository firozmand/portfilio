import { FiArrowUpRight, FiDownload, FiMail } from "react-icons/fi";
import { personalDetails, portfolioProfile } from "@/lib/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
      <div className="contact-orbit contact-orbit-two" aria-hidden="true" />
      <p className="section-kicker">04 · Let&apos;s work together</p>
      <h2 id="contact-title">
        Have a product that deserves a sharper front end?
      </h2>
      <p>
        I&apos;m open to product teams and selective freelance collaborations
        where craft, performance, and maintainable engineering matter.
      </p>

      <div className="contact-actions">
        <a className="button button-dark" href={`mailto:${portfolioProfile.email}`}>
          <FiMail aria-hidden="true" />
          Start a conversation
          <FiArrowUpRight aria-hidden="true" />
        </a>
        <a
          className="button button-outline-dark"
          href={portfolioProfile.resumeUrl ?? "/resume.pdf"}
          download="Ali-Firozmand-Resume.pdf"
        >
          <FiDownload aria-hidden="true" />
          Download résumé
        </a>
      </div>

      <div className="contact-foot">
        <a href={`mailto:${portfolioProfile.email}`}>{portfolioProfile.email}</a>
        <span>{personalDetails.location}</span>
      </div>
    </section>
  );
}
