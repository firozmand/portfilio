"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const items = [
  { title: "Dashboard", href: "/admin" },
  { title: "Profile", href: "/admin/profile" },
  { title: "Projects", href: "/admin/projects" },
  { title: "Skills", href: "/admin/skills" },
  { title: "Theme", href: "/admin/theme" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 md:block">
      <div className="sticky top-6 space-y-4">
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--admin-muted)]">
          Navigation
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link key={it.href} href={it.href} className="relative">
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 border ${
                    active
                      ? "border-[color-mix(in_srgb,var(--color-primary)_60%,var(--admin-border))] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--admin-text)]"
                      : "border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-text-secondary)] hover:border-[color-mix(in_srgb,var(--color-primary)_40%,var(--admin-border))]"
                  }`}
                >
                  <span>{it.title}</span>
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
