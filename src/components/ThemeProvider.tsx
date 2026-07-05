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

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}) {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(null);
  const theme: ThemeMode = "dark";
  const setTheme = () => undefined;

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
    document.documentElement.dataset.theme = theme;
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
    [themeConfig],
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
