"use client";

import { signOut } from "next-auth/react";

export default function AdminNav() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="admin-button danger text-sm"
    >
      Sign out
    </button>
  );
}
