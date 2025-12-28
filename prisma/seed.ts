import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@portfolio.com" },
    update: {},
    create: {
      email: "admin@portfolio.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("✓ Admin user created:", admin.email);

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: "default-profile" },
    update: {},
    create: {
      id: "default-profile",
      fullName: "Ali Firozmand",
      shortBio: "I build things for the web.",
      aboutMe: `I'm a front-end developer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products with React and Next.js.`,
      email: "firozmand.dev@gmail.com",
    },
  });
  console.log("✓ Profile created:", profile.fullName);

  // Create projects
  const projects = [
    {
      title: "Finomate",
      description:
        "The core charting and analysis microservice for the Finomate platform. I developed this service to deliver high-performance, interactive visualizations of cryptocurrency and financial market data.",
      techStack: JSON.stringify([
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Stripe API",
        "Framer Motion",
      ]),
      thumbnail: "/finomate-project.png",
      liveUrl: "https://chart.finomate.io/",
      githubUrl: "https://github.com/firozmand",
      order: 1,
      isVisible: true,
    },
    {
      title: "Amlak Daran",
      description:
        "A comprehensive real estate platform using Vue.js, Nuxt.js, and Tailwind CSS. The site provides property sales, rentals, and a unique property exchange feature.",
      techStack: JSON.stringify([
        "Vue.js",
        "Nuxt.js",
        "Tailwind CSS",
        "JavaScript",
      ]),
      thumbnail: "/amlak-daran.png",
      liveUrl: "https://amlakdaran.com/",
      githubUrl: "https://github.com/firozmand/AmlakDaran",
      order: 2,
      isVisible: true,
    },
    {
      title: "Finomate Landing Page",
      description:
        "The landing page for Finomate, an AI-powered trading assistant for the crypto market.",
      techStack: JSON.stringify([
        "Next.js",
        "Tailwind CSS",
        "Redux Toolkit",
        "MongoDB",
      ]),
      thumbnail: "/finomate-land.png",
      liveUrl: "https://land.finomate.io/",
      githubUrl: "https://github.com/firozmand/",
      order: 3,
      isVisible: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✓ Created ${projects.length} projects`);

  // Create skills
  const skills = [
    { name: "React", level: 95, category: "Frontend", order: 1 },
    { name: "Next.js", level: 90, category: "Frontend", order: 2 },
    { name: "TypeScript", level: 85, category: "Frontend", order: 3 },
    { name: "Vue.js", level: 85, category: "Frontend", order: 4 },
    { name: "Tailwind CSS", level: 95, category: "Frontend", order: 5 },
    { name: "Node.js", level: 80, category: "Backend", order: 6 },
    { name: "PostgreSQL", level: 75, category: "Backend", order: 7 },
    { name: "Git", level: 90, category: "Tools", order: 8 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✓ Created ${skills.length} skills`);

  // Create theme config
  const theme = await prisma.themeConfig.upsert({
    where: { id: "default-theme" },
    update: {},
    create: {
      id: "default-theme",
      primaryColor: "#64ffda",
      accentColor: "#0a192f",
    },
  });
  console.log("✓ Theme config created");

  console.log("✓ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
