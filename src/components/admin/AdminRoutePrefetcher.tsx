"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES = [
  "/admin",
  "/admin/bookings",
  "/admin/services",
  "/admin/gallery",
  "/admin/content",
  "/admin/settings",
];

export function AdminRoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    const prefetchAll = () => {
      for (const route of ROUTES) {
        try {
          router.prefetch(route);
        } catch {
          // ignore
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetchAll, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const t = window.setTimeout(prefetchAll, 200);
    return () => window.clearTimeout(t);
  }, [router]);

  return null;
}
