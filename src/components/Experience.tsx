import { getSkillsByCategory } from "@/lib/data";
import { workExperience } from "@/lib/portfolio";
import type { Skill } from "@prisma/client";

// Server component running in Node.js runtime, fetching skills data with fallbacks.

const Experience = async () => {
  const groupedSkills: Record<string, Skill[]> = await getSkillsByCategory();
  const categories = Object.keys(groupedSkills);

  return (
    <section id="experience" className="py-24">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-green font-mono text-sm">02.</span>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
            Skills & Experience
          </h2>
        </div>
        <div className="hidden sm:block h-px w-32 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
      </div>

      <div className="mb-12 space-y-5">
        {workExperience.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="glass-panel relative overflow-hidden p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green via-[var(--color-primary)] to-transparent" />
            <div className="grid gap-5 lg:grid-cols-[0.32fr_0.68fr]">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-green">
                  Experience {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {experience.website ? (
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-green"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                <p className="mt-1 font-medium text-[var(--text-secondary)]">
                  {experience.role}
                </p>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {experience.period}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {experience.location}
                </p>
              </div>

              <div>
                <p className="leading-relaxed text-[var(--text-secondary)]">
                  {experience.summary}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-green">
            Technical toolkit
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
            Skills used in production
          </h3>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category}
            className="glass-panel p-6 shadow-[var(--shadow-card)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                {category}
              </h3>
              <span className="text-xs font-mono uppercase tracking-[0.12em] text-secondary">
                {groupedSkills[category].length} items
              </span>
            </div>
            <ul className="space-y-4">
              {groupedSkills[category].map((skill) => (
                <li key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-[var(--text-primary)]">
                    <span>{skill.name}</span>
                    <span className="text-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface)] border border-[var(--border-subtle)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] via-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] to-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] shadow-[0_10px_30px_rgba(100,255,218,0.25)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!categories.length && (
        <p className="glass-panel p-6 text-[var(--text-secondary)]">
          Skills will appear here when added.
        </p>
      )}
    </section>
  );
};

export default Experience;
