import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma client is only created if DATABASE_URL is available,
// preventing errors during build time when env vars may not be loaded.
// This ensures Node.js runtime compatibility.

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
