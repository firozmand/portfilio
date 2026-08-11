import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  portfolioProfile,
  resumeProjects,
  resumeSkills,
} from "../src/lib/portfolio";

const prisma = new PrismaClient();

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
    fullName: portfolioProfile.fullName,
    shortBio: portfolioProfile.shortBio,
    aboutMe: portfolioProfile.aboutMe,
    email: portfolioProfile.email,
    resumeUrl: portfolioProfile.resumeUrl,
  };

  const profile = await prisma.profile.upsert({
    where: { id: "default-profile" },
    update: profileData,
    create: { id: "default-profile", ...profileData },
  });
  console.log("Profile ready:", profile.fullName);

  await prisma.project.updateMany({
    where: {
      id: {
        in: [
          "portfolio-festivvo",
          "portfolio-esanj",
          "portfolio-asgari-holdings",
          "portfolio-brand-center",
        ],
      },
    },
    data: { isVisible: false },
  });

  for (const project of resumeProjects) {
    const data = {
      title: project.title,
      description: project.description,
      techStack: JSON.stringify(project.techStack),
      thumbnail: project.thumbnail,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      order: project.order,
      isVisible: project.isVisible,
    };

    await prisma.project.upsert({
      where: { id: project.id },
      update: data,
      create: { id: project.id, ...data },
    });
  }
  console.log(`Projects ready: ${resumeProjects.length}`);

  await prisma.skill.deleteMany({
    where: {
      OR: [
        { id: { startsWith: "portfolio-skill-" } },
        { id: { startsWith: "resume-skill-" } },
      ],
    },
  });

  await prisma.skill.createMany({
    data: resumeSkills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      category: skill.category,
      order: skill.order,
    })),
  });
  console.log(`Skills ready: ${resumeSkills.length}`);

  await prisma.themeConfig.upsert({
    where: { id: "default-theme" },
    update: {},
    create: {
      id: "default-theme",
      primaryColor: "#64ffda",
      accentColor: "#0a192f",
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
