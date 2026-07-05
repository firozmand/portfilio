import { FiBookOpen, FiGlobe, FiMapPin } from "react-icons/fi";
import {
  personalDetails,
  portfolioProfile,
  skillGroups,
} from "@/lib/portfolio";

export default function About() {
  return (
    <section id="about" className="section-shell" aria-labelledby="about-title">
      <div className="section-heading">
        <div>
          <p className="section-kicker">01 · About & capabilities</p>
          <h2 id="about-title">Good interfaces start with good decisions.</h2>
        </div>
        <p className="section-lead">
          I care about the full path from product intent to the details users
          actually touch: architecture, rendering, motion, accessibility,
          responsiveness, and the last 10% of polish.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-story">
          <p>{portfolioProfile.aboutMe}</p>
          <p>
            I&apos;m at my best inside collaborative teams that value thoughtful
            engineering and direct communication. My approach is pragmatic:
            choose the right rendering model, keep components understandable,
            measure performance, and make every interaction earn its place.
          </p>

          <div className="detail-grid">
            <article>
              <FiBookOpen aria-hidden="true" />
              <div>
                <span>Education</span>
                <strong>{personalDetails.education}</strong>
                <small>{personalDetails.university}</small>
              </div>
            </article>
            <article>
              <FiGlobe aria-hidden="true" />
              <div>
                <span>English</span>
                <strong>B2 reading & listening</strong>
                <small>B1 writing & speaking</small>
              </div>
            </article>
            <article>
              <FiMapPin aria-hidden="true" />
              <div>
                <span>Based in</span>
                <strong>{personalDetails.location}</strong>
                <small>Open to remote collaboration</small>
              </div>
            </article>
          </div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-card" key={group.title}>
              <div className="skill-card-head">
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
              </div>
              <p>{group.description}</p>
              <ul aria-label={`${group.title} skills`}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
