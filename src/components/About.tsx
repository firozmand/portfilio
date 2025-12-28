import { getProfile, getSkills } from "@/lib/data";

const About = async () => {
  const [profile, skills] = await Promise.all([getProfile(), getSkills()]);

  if (!profile) return null;

  const aboutParagraphs = profile.aboutMe
    ? profile.aboutMe.split(/\n+/).filter(Boolean)
    : [];

  const topSkills = skills.slice(0, 6);

  return (
    <section id="about" className="py-24">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-green font-mono text-sm">01.</span>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
            About
          </h2>
        </div>
        <div className="hidden sm:block h-px w-32 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-8 shadow-[var(--shadow-card)]">
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed text-lg">
            {aboutParagraphs.length ? (
              aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{profile.shortBio}</p>
            )}
          </div>
        </div>

        <div className="surface-strong p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              Recent tools
            </h3>
            <span className="text-xs font-mono uppercase tracking-[0.12em] text-secondary">
              In my stack
            </span>
          </div>
          {topSkills.length > 0 && (
            <ul className="grid grid-cols-2 gap-3">
              {topSkills.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] shadow-[var(--shadow-soft)]"
                >
                  <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]" />
                  <span className="font-semibold">{skill.name}</span>
                </li>
              ))}
            </ul>
          )}
          {!topSkills.length && (
            <p className="text-secondary">
              Skills will appear here when added.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
