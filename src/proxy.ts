// Protect admin routes while keeping the public portfolio fully static and fast.
export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/admin((?!/login).*)", "/admin"],
};
