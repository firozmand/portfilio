"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SetBodyPath() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (typeof document !== "undefined") {
        document.body.setAttribute("data-path", pathname || "/");
      }
    } catch (e) {
      // no-op
    }
  }, [pathname]);

  return null;
}
