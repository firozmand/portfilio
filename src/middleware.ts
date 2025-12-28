// This middleware runs in Edge Runtime for performance.
// It only performs lightweight session checks using NextAuth's auth() function.
// No Node.js dependencies (Prisma, bcrypt) are imported or executed here.
// Database and auth logic are handled in Node.js runtime via lazy imports in auth.ts.

export { auth as middleware } from "@/auth";

// Only protect admin routes except the login page to avoid redirect loops
export const config = {
  matcher: ["/admin((?!/login).*)", "/admin"],
};
