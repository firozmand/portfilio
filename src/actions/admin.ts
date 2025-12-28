"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

async function saveUploadedFile(file: any) {
  if (!file || typeof file.arrayBuffer !== "function") return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const originalName = file.name || `file-${Date.now()}`;
  const safeName = encodeURIComponent(originalName.replace(/\s+/g, "-"));
  const filename = `${Date.now()}-${safeName}`;
  const filepath = path.join(uploadsDir, filename);

  await fs.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// Profile Actions
export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  // handle resume file upload if provided
  const resumeFile = formData.get("resumeFile") as any;
  let resumeUrl = (formData.get("resumeUrl") as string) || null;
  if (resumeFile && typeof resumeFile !== "string") {
    const saved = await saveUploadedFile(resumeFile);
    if (saved) resumeUrl = saved;
  }

  const data = {
    fullName: formData.get("fullName") as string,
    shortBio: formData.get("shortBio") as string,
    aboutMe: formData.get("aboutMe") as string,
    email: formData.get("email") as string,
    resumeUrl: resumeUrl || null,
  };

  try {
    const profile = await prisma.profile.findFirst();

    if (profile) {
      await prisma.profile.update({
        where: { id: profile.id },
        data,
      });
    } else {
      await prisma.profile.create({ data });
    }

    revalidatePath("/");
    revalidatePath("/admin/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}

// Project Actions
export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const techStackStr = formData.get("techStack") as string;
  const techStack = techStackStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // process thumbnail file if provided
  const thumbnailFile = formData.get("thumbnailFile") as any;
  let thumbnail = (formData.get("thumbnail") as string) || null;
  if (thumbnailFile && typeof thumbnailFile !== "string") {
    const saved = await saveUploadedFile(thumbnailFile);
    if (saved) thumbnail = saved;
  }

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    techStack: JSON.stringify(techStack),
    thumbnail: thumbnail,
    liveUrl: (formData.get("liveUrl") as string) || null,
    githubUrl: (formData.get("githubUrl") as string) || null,
    order: parseInt(formData.get("order") as string) || 0,
    isVisible: formData.get("isVisible") === "true",
  };

  try {
    await prisma.project.create({ data });
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { error: "Failed to create project" };
  }
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const techStackStr = formData.get("techStack") as string;
  const techStack = techStackStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // process thumbnail file if provided
  const thumbnailFile = formData.get("thumbnailFile") as any;
  let thumbnail = (formData.get("thumbnail") as string) || null;
  if (thumbnailFile && typeof thumbnailFile !== "string") {
    const saved = await saveUploadedFile(thumbnailFile);
    if (saved) thumbnail = saved;
  }

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    techStack: JSON.stringify(techStack),
    thumbnail: thumbnail,
    liveUrl: (formData.get("liveUrl") as string) || null,
    githubUrl: (formData.get("githubUrl") as string) || null,
    order: parseInt(formData.get("order") as string) || 0,
    isVisible: formData.get("isVisible") === "true",
  };

  try {
    await prisma.project.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { error: "Failed to delete project" };
  }
}

// Skill Actions
export async function createSkill(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const data = {
    name: formData.get("name") as string,
    level: parseInt(formData.get("level") as string),
    category: (formData.get("category") as string) || null,
    order: parseInt(formData.get("order") as string) || 0,
  };

  try {
    await prisma.skill.create({ data });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    console.error("Failed to create skill:", error);
    return { error: "Failed to create skill" };
  }
}

export async function updateSkill(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const data = {
    name: formData.get("name") as string,
    level: parseInt(formData.get("level") as string),
    category: (formData.get("category") as string) || null,
    order: parseInt(formData.get("order") as string) || 0,
  };

  try {
    await prisma.skill.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    console.error("Failed to update skill:", error);
    return { error: "Failed to update skill" };
  }
}

export async function deleteSkill(id: string) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.skill.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return { error: "Failed to delete skill" };
  }
}

// Theme Actions
export async function updateTheme(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const data = {
    primaryColor: formData.get("primaryColor") as string,
    accentColor: formData.get("accentColor") as string,
  };

  try {
    const theme = await prisma.themeConfig.findFirst();

    if (theme) {
      await prisma.themeConfig.update({
        where: { id: theme.id },
        data,
      });
    } else {
      await prisma.themeConfig.create({ data });
    }

    revalidatePath("/");
    revalidatePath("/admin/theme");
    return { success: true };
  } catch (error) {
    console.error("Failed to update theme:", error);
    return { error: "Failed to update theme" };
  }
}

// Admin credential update
export async function updateAdminCredentials(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const adminId = session.user?.id as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newEmail = (formData.get("newEmail") as string) || undefined;
  const newPassword = (formData.get("newPassword") as string) || undefined;
  const confirmPassword =
    (formData.get("confirmPassword") as string) || undefined;

  if (!currentPassword) {
    return { error: "Current password is required" };
  }

  try {
    // Resolve admin by id if available, otherwise try session email, otherwise fallback to first admin
    let admin = null;
    if (adminId) {
      admin = await prisma.admin.findUnique({ where: { id: adminId } });
    }
    if (!admin && session.user?.email) {
      admin = await prisma.admin.findUnique({
        where: { email: session.user.email as string },
      });
    }
    if (!admin) {
      // single-admin fallback: pick first admin record
      admin = await prisma.admin.findFirst();
    }

    if (!admin) return { error: "Admin not found" };

    if (!admin) return { error: "Admin not found" };

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) return { error: "Current password is incorrect" };

    const updateData: any = {};

    if (newEmail && newEmail !== admin.email) {
      // ensure unique
      const exists = await prisma.admin.findUnique({
        where: { email: newEmail },
      });
      if (exists) return { error: "Email already in use" };
      updateData.email = newEmail;
    }

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        return { error: "New password and confirmation do not match" };
      }
      const hashed = await bcrypt.hash(newPassword, 10);
      updateData.password = hashed;
    }

    if (Object.keys(updateData).length === 0) {
      return { error: "No changes provided" };
    }

    // Use id when available, otherwise use the admin's current email as unique key
    const whereClause = adminId ? { id: adminId } : { email: admin.email };
    await prisma.admin.update({ where: whereClause, data: updateData });

    revalidatePath("/admin/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update admin credentials:", error);
    return {
      error: (error as Error)?.message || "Failed to update credentials",
    };
  }
}
