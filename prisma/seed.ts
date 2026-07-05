import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const projects = [
  {
    id: "portfolio-festivvo",
    title: "Festivvo",
    description:
      "A modern event and concert ticketing product with responsive purchase journeys, scalable front-end architecture, and a strong focus on performance.",
    techStack: JSON.stringify([
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ]),
    thumbnail: null,
    liveUrl: "https://festivvo.ir",
    githubUrl: null,
    order: 1,
    isVisible: true,
  },
  {
    id: "portfolio-esanj",
    title: "E-Sanj Test Builder",
    description:
      "A psychology assessment builder that turns structured data into HTML, CSS, JavaScript, and JSON while keeping complex rendering logic manageable.",
    techStack: JSON.stringify(["Next.js", "JavaScript", "SSR/SSG", "JSON"]),
    thumbnail: null,
    liveUrl: "https://esanj.ir",
    githubUrl: null,
    order: 2,
    isVisible: true,
  },
  {
    id: "portfolio-asgari-holdings",
    title: "Asgari Holdings",
    description:
      "The corporate website for Asgari Holdings, shaped around a contemporary visual language, scalable content structure, fast delivery, and SEO.",
    techStack: JSON.stringify([
      "Next.js",
      "TypeScript",
      "Responsive UI",
      "SEO",
    ]),
    thumbnail: null,
    liveUrl: "https://asgariholdings.com",
    githubUrl: null,
    order: 3,
    isVisible: true,
  },
  {
    id: "portfolio-brand-center",
    title: "Brand Center",
    description:
      "A multi-surface platform for employers and brands, including profile pages, brand introductions, and structured organizational content.",
    techStack: JSON.stringify([
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ]),
    thumbnail: null,
    liveUrl: "https://brand-center.org",
    githubUrl: null,
    order: 4,
    isVisible: true,
  },
];

const skills = [
  ["Next.js", 95, "Frontend"],
  ["React", 95, "Frontend"],
  ["TypeScript", 90, "Frontend"],
  ["JavaScript ES6+", 92, "Frontend"],
  ["Vue.js", 82, "Frontend"],
  ["Tailwind CSS", 95, "UI"],
  ["Sass / SCSS", 84, "UI"],
  ["Responsive UI", 94, "UI"],
  ["Redux Toolkit", 88, "State & Data"],
  ["Zustand", 86, "State & Data"],
  ["TanStack Query", 88, "State & Data"],
  ["REST APIs", 90, "State & Data"],
  ["SSR / SSG / CSR", 90, "Architecture"],
  ["SEO & Performance", 88, "Architecture"],
  ["Git / GitLab", 90, "Tools"],
  ["Docker", 76, "Tools"],
] as const;

async function main() {
  console.log("Starting database seed...");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the admin account",
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("Admin ready:", admin.email);

  const profileData = {
    fullName: "Ali Firozmand",
    shortBio:
      "Front-End Developer focused on modern, high-performance products.",
    aboutMe:
      "Front-end developer with 4+ years of experience designing and building modern web applications, management panels, online sales systems, and content platforms. I focus on Next.js, React, and TypeScript, with a strong interest in component architecture, rendering strategy, performance, SEO, clean code, and practical collaboration.",
    email: "firozmand.dev@gmail.com",
    resumeUrl: "/resume.pdf",
  };

  const profile = await prisma.profile.upsert({
    where: { id: "default-profile" },
    update: profileData,
    create: { id: "default-profile", ...profileData },
  });
  console.log("Profile ready:", profile.fullName);

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }
  console.log(`Projects ready: ${projects.length}`);

  for (const [index, [name, level, category]] of skills.entries()) {
    const id = `portfolio-skill-${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
    const data = { id, name, level, category, order: index + 1 };

    await prisma.skill.upsert({
      where: { id },
      update: data,
      create: data,
    });
  }
  console.log(`Skills ready: ${skills.length}`);

  await prisma.themeConfig.upsert({
    where: { id: "default-theme" },
    update: {},
    create: {
      id: "default-theme",
      primaryColor: "#b7ff3c",
      accentColor: "#07110f",
    },
  });
  console.log("Theme ready");
  console.log("Database seeding completed");
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
