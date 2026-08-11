// This file configures NextAuth for authentication.
// Prisma and bcryptjs are imported lazily inside the authorize function
// to avoid importing Node.js dependencies in Edge Runtime (middleware).
// The auth() function used in middleware does not execute authorize.

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Requests are served behind Vercel's trusted reverse proxy.
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { prisma } = await import("@/lib/prisma"); // Lazy import for Edge compatibility
        const bcrypt = await import("bcryptjs"); // Lazy import for Edge compatibility
        if (!prisma) return null; // DB not available
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) {
          return null;
        }

        const passwordMatch = await bcrypt.default.compare(
          credentials.password as string,
          admin.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname.startsWith("/admin/login");

      if (isOnAdmin) {
        if (isOnLogin) {
          return true; // Always allow access to login page
        }
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
});
