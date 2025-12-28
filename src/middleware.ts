export { auth as middleware } from "@/auth";

// Only protect admin routes except the login page to avoid redirect loops
export const config = {
  matcher: ["/admin((?!/login).*)", "/admin"],
};
