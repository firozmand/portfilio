import { getThemeConfig } from "@/lib/data";
import ThemeForm from "./ThemeForm";

export default async function ThemePage() {
  const theme = await getThemeConfig();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-8">
        Theme Configuration
      </h1>

      <div className="admin-card p-6">
        <p className="text-[var(--admin-text-secondary)] mb-6">
          Customize your portfolio's color scheme. Changes will be applied
          globally across your site.
        </p>
        <ThemeForm theme={theme} />
      </div>
    </div>
  );
}
