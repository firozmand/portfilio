import { handlers } from "@/auth";

export const runtime = "nodejs"; // Ensure Node.js runtime for auth handlers using bcrypt and Prisma

export const { GET, POST } = handlers;
