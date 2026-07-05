import { FiArrowUpRight } from "react-icons/fi";
import { resumeProjects } from "@/lib/portfolio";

const projectLabels = [
  "Ticketing platform",
  "Assessment builder",
  "Corporate experience",
  "Brand platform",
] as const;

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-shell"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-kicker">03 · Selected work</p>
          <h2 id="projects-title">Products built for real-world use.</h2>
        </div>
        <p className="section-lead">
          A selection from my latest résumé: products for ticketing,
          assessments, corporate communication, and employer branding.
        </p>
      </div>

      <div className="projects-grid">
        {resumeProjects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className={`project-canvas project-canvas-${index + 1}`}>
              <div className="canvas-toolbar">
                <span />
                <span />
                <span />
                <small>0{index + 1} / 04</small>
              </div>
              <div className="canvas-word" aria-hidden="true">
                {project.title.split(" ")[0]}
              </div>
              <div className="canvas-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="canvas-badge">Live product</div>
            </div>

            <div className="project-body">
              <div className="project-meta">
                <span>{projectLabels[index]}</span>
                <span>0{index + 1}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul aria-label={`${project.title} technology stack`}>
                {project.techStack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.title}`}
                >
                  Visit project <FiArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
