"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Routes that were built for the dark theme and must keep it. */
const DARK_PREFIXES = ["/admin", "/login"];

/** Routes where public Navbar / Footer / WhatsApp should be hidden. */
const ADMIN_PREFIXES = ["/admin"];

export default function BodyScopeProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const isDark = DARK_PREFIXES.some((prefix) => pathname.startsWith(prefix));
    const isAdmin = ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

    if (isDark) {
      document.body.setAttribute("data-scope", "dark");
    } else {
      document.body.removeAttribute("data-scope");
    }

    if (isAdmin) {
      document.body.setAttribute("data-admin", "true");
    } else {
      document.body.removeAttribute("data-admin");
    }
  }, [pathname]);

  return null;
}
