// Data functions are designed to return null/empty data if Prisma is unavailable,
// preventing errors during build time or when DATABASE_URL is missing.
// All functions check for prisma existence before executing database queries.

import { prisma } from "./prisma";
import { cache } from "react";
import type { Profile, Project, Skill, ThemeConfig } from "@prisma/client";
import {
  portfolioProfile,
  resumeProjects,
  resumeSkills,
} from "./portfolio";

const parseTechStack = (value: string): string[] => {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
      ? parsed
      : [];
  } catch {
    return [];
  }
};

// Profile
export const getProfile = cache(async (): Promise<Profile | null> => {
  if (!prisma) return portfolioProfile;

  try {
    return (await prisma.profile.findFirst()) ?? portfolioProfile;
  } catch (error) {
    console.error("Failed to load profile data:", error);
    return portfolioProfile;
  }
});

// Projects
export const getProjects = cache(
  async (): Promise<
    (Omit<Project, "techStack"> & { techStack: string[] })[]
  > => {
    if (!prisma) return resumeProjects;

    try {
      const projects = await prisma.project.findMany({
        where: { isVisible: true },
        orderBy: { order: "asc" },
      });

      if (!projects.length) return resumeProjects;

      return projects.map((project) => ({
        ...project,
        techStack: parseTechStack(project.techStack),
      }));
    } catch (error) {
      console.error("Failed to load project data:", error);
      return resumeProjects;
    }
  }
);

export const getAllProjects = cache(
  async (): Promise<
    (Omit<Project, "techStack"> & { techStack: string[] })[]
  > => {
    if (!prisma) return []; // No DB available
    try {
      const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
      });

      return projects.map((project) => ({
        ...project,
        techStack: parseTechStack(project.techStack),
      }));
    } catch (error) {
      console.error("Failed to load admin project data:", error);
      return [];
    }
  }
);

export const getProjectById = cache(
  async (
    id: string
  ): Promise<(Omit<Project, "techStack"> & { techStack: string[] }) | null> => {
    if (!prisma) return null; // No DB available
    try {
      const project = await prisma.project.findUnique({
        where: { id },
      });

      if (!project) return null;

      return {
        ...project,
        techStack: parseTechStack(project.techStack),
      };
    } catch (error) {
      console.error("Failed to load project data:", error);
      return null;
    }
  }
);

// Skills
export const getSkills = cache(async (): Promise<Skill[]> => {
  if (!prisma) return resumeSkills;

  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return skills.length ? skills : resumeSkills;
  } catch (error) {
    console.error("Failed to load skill data:", error);
    return resumeSkills;
  }
});

export const getAllSkills = cache(async (): Promise<Skill[]> => {
  if (!prisma) return [];

  try {
    return await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to load admin skill data:", error);
    return [];
  }
});

export const getSkillsByCategory = cache(
  async (): Promise<Record<string, Skill[]>> => {
    const skills = await getSkills();

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
  if (!prisma) return null; // No DB available
  try {
    return await prisma.themeConfig.findFirst();
  } catch (error) {
    console.error("Failed to load theme data:", error);
    return null;
  }
});
