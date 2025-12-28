import { getProfile } from "@/lib/data";

const Contact = async () => {
  const profile = await getProfile();
  if (!profile) return null;

  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel relative overflow-hidden px-8 py-12 text-center shadow-[var(--shadow-card)]">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
            <div className="absolute left-1/2 top-6 h-36 w-36 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_24%,transparent)] blur-3xl" />
          </div>

          <p className="text-sm font-mono uppercase tracking-[0.14em] text-green">
            04. What’s next
          </p>
          <h3 className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">
            Let’s build something calm
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            {profile.shortBio ||
              "Feel free to reach out if you want to collaborate or just say hello."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] px-7 py-3 text-base font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Say hello
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-7 py-3 text-base font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              View projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
