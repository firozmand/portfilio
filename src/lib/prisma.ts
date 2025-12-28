import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma client is only created if DATABASE_URL is available,
// preventing errors during build time when env vars may not be loaded.
// This ensures Node.js runtime compatibility.
// If DATABASE_URL is missing, prisma remains undefined, handled by data functions.

export const prisma: PrismaClient | undefined = process.env.DATABASE_URL
  ? globalForPrisma.prisma ?? new PrismaClient()
  : undefined;

if (process.env.NODE_ENV !== "production" && prisma)
  globalForPrisma.prisma = prisma;
