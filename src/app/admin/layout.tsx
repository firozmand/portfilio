"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminNav from "./AdminNav";
import AdminThemeToggle from "@/components/AdminThemeToggle";
import AdminSidebar from "@/components/AdminSidebar";

type ThemeConfig = {
  primaryColor: string;
  accentColor: string;
} | null;

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [theme, setTheme] = useState<ThemeConfig>(null);

  // Fetch theme config on mount and listen for theme updates
  useEffect(() => {
    async function fetchTheme() {
      try {
        const response = await fetch("/api/theme");
        if (response.ok) {
          const themeData = await response.json();
          setTheme(themeData);
        }
      } catch (error) {
        console.error("Failed to fetch theme:", error);
      }
    }

    if (!isLoginPage) {
      fetchTheme();
    }

    // Listen for theme updates
    const handleThemeUpdate = () => {
      fetchTheme();
    };

    window.addEventListener("themeUpdated", handleThemeUpdate);

    return () => {
      window.removeEventListener("themeUpdated", handleThemeUpdate);
    };
  }, [isLoginPage]);

  // Middleware protects admin routes. Do not import server auth here to avoid RSC resolution errors.
  const sessionEmail = "";
  const navItems = [
    { title: "Dashboard", href: "/admin" },
    { title: "Profile", href: "/admin/profile" },
    { title: "Projects", href: "/admin/projects" },
    { title: "Skills", href: "/admin/skills" },
    { title: "Theme", href: "/admin/theme" },
  ];

  if (isLoginPage) {
    // For login page, just return children without admin layout
    return <>{children}</>;
  }

  return (
    <div
      className="admin-wrapper min-h-screen"
      data-admin-theme="dark"
      style={
        {
          "--theme-primary": theme?.primaryColor || "#64ffda",
          "--theme-accent": theme?.accentColor || "#0a192f",
        } as React.CSSProperties
      }
    >
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-4">
          <div className="admin-shell flex items-center justify-between gap-4 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] border border-[var(--admin-border)] flex items-center justify-center text-lg font-semibold text-[var(--admin-text)] shadow-[var(--admin-shadow-soft)]">
                AP
              </div>
              <div className="leading-tight">
                <p className="text-sm text-[var(--admin-muted)]">
                  Control Center
                </p>
                <Link
                  href="/admin"
                  className="text-lg font-semibold text-[var(--admin-text)]"
                >
                  Admin Panel
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {sessionEmail && (
                <span className="text-sm text-[var(--admin-muted)]">
                  {sessionEmail}
                </span>
              )}
              <AdminNav />
            </div>
          </div>

          {/* Mobile quick nav */}
          <div className="mt-3 flex md:hidden gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="admin-badge whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-10 pb-10">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="admin-card min-h-[60vh] border border-[var(--admin-border)] p-6 sm:p-8 shadow-[var(--admin-shadow)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
