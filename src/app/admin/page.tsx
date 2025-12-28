import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    {
      title: "Profile",
      description: "Manage your personal information and bio",
      href: "/admin/profile",
      icon: "👤",
    },
    {
      title: "Projects",
      description: "Add, edit, or remove projects from your portfolio",
      href: "/admin/projects",
      icon: "💼",
    },
    {
      title: "Skills",
      description: "Manage your skills and proficiency levels",
      href: "/admin/skills",
      icon: "⚡",
    },
    {
      title: "Theme",
      description: "Customize your portfolio's color scheme",
      href: "/admin/theme",
      icon: "🎨",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--admin-muted)]">
          Overview
        </p>
        <h1 className="text-3xl font-semibold text-[var(--admin-text)]">
          Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="block">
            <div className="admin-card p-6 h-full hover:-translate-y-1 transition-transform flex flex-col items-center text-center gap-4 border border-[var(--admin-border)]">
              <div className="text-5xl leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                {s.icon}
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-[var(--admin-text)]">
                {s.title}
              </h2>
              <p className="text-sm text-[var(--admin-text-secondary)] max-w-[28rem]">
                {s.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-card p-6 border border-[var(--admin-border)]">
        <h3 className="text-lg font-semibold text-[var(--admin-text)] mb-3">
          Quick Tips
        </h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--admin-text-secondary)]">
          <li>Keep your Profile up to date.</li>
          <li>Set project visibility and order for best presentation.</li>
          <li>Use accurate skill levels (0–100).</li>
          <li>Provide hex colors for theme fields (e.g. #64ffda).</li>
        </ul>
      </div>
    </div>
  );
}
