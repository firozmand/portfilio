import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/app/globals.css";
import "@/app/portfolio.css";
import Navbar from "@/components/Navbar";
import SetBodyPath from "@/components/SetBodyPath";
import { ThemeProvider } from "@/components/ThemeProvider";
import { personalDetails, portfolioProfile } from "@/lib/portfolio";

const siteUrl = "https://firozmand.ir";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ali Firozmand | Front-End Developer",
    template: "%s | Ali Firozmand",
  },
  description:
    "Front-End Developer with 4+ years of experience building fast, scalable products with Next.js, React, and TypeScript.",
  keywords: [
    "Ali Firozmand",
    "Front-End Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: portfolioProfile.fullName, url: siteUrl }],
  creator: portfolioProfile.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ali Firozmand",
    title: "Ali Firozmand | Front-End Developer",
    description:
      "Selected work, experience, and capabilities across modern front-end product development.",
    images: [
      {
        url: "/profile.jpg",
        width: 640,
        height: 640,
        alt: "Ali Firozmand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Firozmand | Front-End Developer",
    description:
      "Building fast, thoughtful products with Next.js, React, and TypeScript.",
    images: ["/profile.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07110f",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioProfile.fullName,
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  jobTitle: "Front-End Developer",
  email: `mailto:${portfolioProfile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Isfahan",
    addressCountry: "IR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: personalDetails.university,
  },
  sameAs: [personalDetails.github, personalDetails.linkedin],
  knowsAbout: ["Next.js", "React", "TypeScript", "Web Performance", "SEO"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          <SetBodyPath />
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navbar />
          {children}
        </ThemeProvider>
        <Script
          id="person-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
