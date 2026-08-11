import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { getProjects } from "@/lib/data";
import type { Project } from "@prisma/client";
import ProjectMedia from "./ProjectMedia";

// Server component in Node.js runtime, loading projects with database fallbacks.

const Projects = async () => {
  const projects: (Omit<Project, "techStack"> & { techStack: string[] })[] =
    await getProjects();

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
            key={project.id}
            className="glass-panel overflow-hidden p-6 shadow-[var(--shadow-card)]"
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <ProjectMedia
                title={project.title}
                thumbnail={project.thumbnail}
                url={project.liveUrl || project.githubUrl}
                techStack={project.techStack}
                index={index}
              />

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
                  {project.liveUrl || project.githubUrl ? (
                    <a
                      href={project.liveUrl || project.githubUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-green"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {project.description}
                </p>
                <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--text-secondary)]">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
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
