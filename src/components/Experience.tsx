import { getSkillsByCategory } from "@/lib/data";
import type { Skill } from "@prisma/client";

// Server component running in Node.js runtime, fetching skills data with fallbacks.

const Experience = async () => {
  const groupedSkills: Record<string, Skill[]> = await getSkillsByCategory();
  const categories = Object.keys(groupedSkills);

  if (!categories.length) return null;

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
    </section>
  );
};

export default Experience;
