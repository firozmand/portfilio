"use client";

import { updateTheme } from "@/actions/admin";
import { useState } from "react";

type ThemeFormProps = {
  theme: {
    primaryColor: string;
    accentColor: string;
  } | null;
};

export default function ThemeForm({ theme }: ThemeFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [primaryColor, setPrimaryColor] = useState(
    theme?.primaryColor || "#64ffda"
  );
  const [accentColor, setAccentColor] = useState(
    theme?.accentColor || "#0a192f"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateTheme(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Theme updated successfully!" });
      // Dispatch custom event to update background dots
      window.dispatchEvent(new CustomEvent("themeUpdated"));
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`admin-alert ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="primaryColor" className="admin-label mb-2">
            Primary color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-12 w-20 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="admin-input"
              placeholder="#64ffda"
            />
          </div>
          <p className="admin-helper">
            Used for accents, buttons, and highlights.
          </p>
        </div>

        <div>
          <label htmlFor="accentColor" className="admin-label mb-2">
            Accent color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="accentColor"
              name="accentColor"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="h-12 w-20 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]"
            />
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="admin-input"
              placeholder="#0a192f"
            />
          </div>
          <p className="admin-helper">Drives gradients and background tones.</p>
        </div>
      </div>

      <div className="admin-card p-5">
        <h3 className="text-sm font-semibold text-[var(--admin-text)] mb-3">
          Live preview
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            className="rounded-xl p-4 shadow-[var(--admin-shadow-soft)]"
            style={{ background: primaryColor }}
          >
            <span className="text-[#041225] font-semibold">Primary</span>
          </div>
          <div
            className="rounded-xl p-4 shadow-[var(--admin-shadow-soft)]"
            style={{ background: accentColor }}
          >
            <span className="text-white font-semibold">Accent</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="admin-helper">
          Updating colors refreshes the public theme instantly.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="admin-button primary w-full sm:w-auto"
        >
          {loading ? "Saving..." : "Save theme"}
        </button>
      </div>
    </form>
  );
}
