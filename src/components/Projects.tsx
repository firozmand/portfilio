import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { getProjects } from "@/lib/data";

const Projects = async () => {
  const projects = await getProjects();

  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='750' viewBox='0 0 1200 750'%3E%3Crect width='1200' height='750' fill='%230a192f'/%3E%3Ctext x='50%' y='50%' fill='%2364ffda' font-size='48' font-family='sans-serif' text-anchor='middle'%3EProject%3C/text%3E%3C/svg%3E";

  if (!projects.length) {
    return null;
  }

  return (
    <section id="projects" className="py-24">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-green font-mono text-sm">03.</span>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
            Selected Work
          </h2>
        </div>
        <div className="hidden sm:block h-px w-32 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
      </div>

      <div className="space-y-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="glass-panel overflow-hidden p-6 shadow-[var(--shadow-card)]"
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_srgb,var(--color-primary)_28%,transparent)]/30 via-transparent to-transparent" />
                <Image
                  src={project.thumbnail || placeholderImage}
                  alt={project.title}
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-mono uppercase tracking-[0.12em] text-green">
                    Featured project
                  </p>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] p-2 text-[var(--text-primary)] transition hover:text-green"
                      >
                        <FiGithub size={18} />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] p-2 text-[var(--text-primary)] transition hover:text-green"
                      >
                        <FiExternalLink size={18} />
                      </Link>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  <a
                    href={project.liveUrl || project.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {project.description}
                </p>
                <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--text-secondary)]">
                  {project.techStack.map((tech, i) => (
                    <li
                      key={i}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1 text-[var(--text-primary)] shadow-[var(--shadow-soft)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
