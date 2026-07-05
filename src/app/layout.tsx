import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import SetBodyPath from "@/components/SetBodyPath";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://firozmand.ir"),
  title: "Ali Firozmand | Front-End Developer",
  description:
    "Front-End Developer with 4+ years of experience building modern products with Next.js, React, and TypeScript.",
  keywords: [
    "Ali Firozmand",
    "Front-End Developer",
    "Next.js",
    "React",
    "TypeScript",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://firozmand.ir",
    title: "Ali Firozmand | Front-End Developer",
    description:
      "Portfolio, selected work, and experience of Ali Firozmand.",
    images: ["/profile.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040813",
};

// This layout runs during prerender and does not execute database queries.
// Theme config is loaded asynchronously with fallbacks to avoid build-time dependencies.
// CSS variables are set with defaults if theme is unavailable.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed inline DOM-mutation scripts to avoid hydration mismatches.
  // Theme and path are set client-side by ThemeProvider and SetBodyPath.

  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className} antialiased`}>
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
