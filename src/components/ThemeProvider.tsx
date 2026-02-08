"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "dark";

type ThemeConfig = {
  primaryColor: string;
  accentColor: string;
} | null;

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  themeConfig: ThemeConfig;
};

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}) {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(null);

  // Load theme config from API
  useEffect(() => {
    const loadThemeConfig = async () => {
      try {
        const response = await fetch("/api/theme");
        if (response.ok) {
          const config = await response.json();
          setThemeConfig(config);
          // Set CSS variables
          if (config) {
            document.documentElement.style.setProperty(
              "--color-primary",
              config.primaryColor,
            );
            document.documentElement.style.setProperty(
              "--color-accent",
              config.accentColor,
            );
          }
        }
      } catch (error) {
        console.error("Failed to load theme config:", error);
        // Set defaults
        document.documentElement.style.setProperty(
          "--color-primary",
          "#64ffda",
        );
        document.documentElement.style.setProperty("--color-accent", "#0a192f");
      }
    };

    loadThemeConfig();
  }, []);

  useEffect(() => {
    const stored =
      (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) || null;
    const nextTheme = stored || "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, [defaultTheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    // No toggle, always dark
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      themeConfig,
    }),
    [theme, themeConfig],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
