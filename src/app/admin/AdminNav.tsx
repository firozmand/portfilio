"use client";

import { signOut } from "next-auth/react";

export default function AdminNav() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/admin/login" })}
      className="admin-button danger text-sm"
    >
      Sign out
    </button>
  );
}
