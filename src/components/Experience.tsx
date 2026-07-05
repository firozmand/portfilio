import { FiArrowUpRight } from "react-icons/fi";
import { workExperience } from "@/lib/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-shell experience-section"
      aria-labelledby="experience-title"
    >
      <div className="section-heading section-heading-light">
        <div>
          <p className="section-kicker">02 · Experience</p>
          <h2 id="experience-title">Four years of learning by shipping.</h2>
        </div>
        <p className="section-lead">
          From assessment builders to ticketing systems, I&apos;ve worked where
          product complexity, front-end quality, and delivery speed meet.
        </p>
      </div>

      <div className="experience-list">
        {workExperience.map((experience, index) => (
          <article className="experience-row" key={experience.company}>
            <div className="experience-index">0{index + 1}</div>
            <div className="experience-meta">
              <span>{experience.period}</span>
              <small>{experience.location}</small>
            </div>
            <div className="experience-content">
              <p>{experience.role}</p>
              <h3>{experience.company}</h3>
              <div className="experience-summary">{experience.summary}</div>
              <ul>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <FiArrowUpRight className="experience-arrow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
