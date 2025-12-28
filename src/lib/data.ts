import { prisma } from "./prisma";
import { cache } from "react";
import type { Profile, Project, Skill, ThemeConfig } from "@prisma/client";

// Profile
export const getProfile = cache(async (): Promise<Profile | null> => {
  const profile = await prisma.profile.findFirst();
  return profile;
});

// Projects
export const getProjects = cache(
  async (): Promise<
    (Omit<Project, "techStack"> & { techStack: string[] })[]
  > => {
    const projects = await prisma.project.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    });

    return projects.map((project) => ({
      ...project,
      techStack: JSON.parse(project.techStack) as string[],
    }));
  }
);

export const getAllProjects = cache(
  async (): Promise<
    (Omit<Project, "techStack"> & { techStack: string[] })[]
  > => {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return projects.map((project) => ({
      ...project,
      techStack: JSON.parse(project.techStack) as string[],
    }));
  }
);

export const getProjectById = cache(
  async (
    id: string
  ): Promise<(Omit<Project, "techStack"> & { techStack: string[] }) | null> => {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) return null;

    return {
      ...project,
      techStack: JSON.parse(project.techStack) as string[],
    };
  }
);

// Skills
export const getSkills = cache(async (): Promise<Skill[]> => {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
  return skills;
});

export const getSkillsByCategory = cache(
  async (): Promise<Record<string, Skill[]>> => {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    const grouped = skills.reduce(
      (acc: Record<string, Skill[]>, skill: Skill) => {
        const category = skill.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>
    );

    return grouped;
  }
);

// Theme
export const getThemeConfig = cache(async (): Promise<ThemeConfig | null> => {
  const theme = await prisma.themeConfig.findFirst();
  return theme;
});
