import { getProfile } from "@/lib/data";

const accentPill = (
  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-green shadow-[var(--shadow-soft)]">
    Front-end Developer
  </div>
);

const Hero = async () => {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden rounded-[32px] glass-panel px-6 py-16 sm:px-10 md:py-20 lg:px-14">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] blur-3xl" />
      </div>

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          {accentPill}
          <div className="space-y-3">
            <p className="text-sm font-mono uppercase tracking-[0.16em] text-secondary">
              Hi, I am
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-primary text-[var(--text-primary)]">
              {profile.fullName}
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-secondary">
              {profile.shortBio}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            {profile.aboutMe}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] px-6 py-3 text-base font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-5 py-3 text-base font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              View projects
            </a>
          </div>
        </div>

        <div className="surface-strong relative overflow-hidden p-6 shadow-[var(--shadow-card)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
          <div className="grid gap-4">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]/40 px-4 py-3 text-sm font-semibold text-[var(--text-primary)]">
              Crafting interfaces that feel calm, premium, and effortless.
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-secondary)]">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-secondary">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[var(--text-primary)] font-semibold break-all"
                >
                  {profile.email}
                </a>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-secondary">
                  Focus
                </p>
                <p className="text-[var(--text-primary)] font-semibold">
                  Front-end craft & product
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-secondary">
                  Approach
                </p>
                <p className="text-[var(--text-primary)] font-semibold">
                  Human, tactile, responsive
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-secondary">
                  Mindset
                </p>
                <p className="text-[var(--text-primary)] font-semibold">
                  Calm, detail-driven delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
