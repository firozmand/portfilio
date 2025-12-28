import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import { getThemeConfig } from "@/lib/data";
import SetBodyPath from "@/components/SetBodyPath";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ali Firozmand | Front-End Developer",
  description: "Portfolio of Ali Firozmand",
};

// This layout runs during prerender and does not execute database queries.
// Theme config is loaded asynchronously with fallbacks to avoid build-time dependencies.
// CSS variables are set with defaults if theme is unavailable.

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemeConfig();
  const primaryColor = theme?.primaryColor || "#64ffda";
  const accentColor = theme?.accentColor || "#0a192f";
  const bodyStyle: CSSProperties = {
    ["--color-primary" as string]: primaryColor,
    ["--color-accent" as string]: accentColor,
  };

  // Removed inline DOM-mutation scripts to avoid hydration mismatches.
  // Theme and path are set client-side by ThemeProvider and SetBodyPath.

  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className} antialiased`} style={bodyStyle}>
        <ThemeProvider>
          <SetBodyPath />
          <Navbar />
          <SocialLinks />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
