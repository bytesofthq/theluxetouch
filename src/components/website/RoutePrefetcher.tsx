"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES = [
  "/",
  "/services",
  "/gallery",
  "/about",
  "/our-promise",
  "/contact",
  "/book",
  "/privacy-policy",
  "/terms",
];

/** Prefetch primary routes while the browser is idle so clicks feel instant. */
export function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    const prefetchAll = () => {
      for (const route of ROUTES) {
        try {
          router.prefetch(route);
        } catch {
          // Ignore prefetch errors (offline / aborted)
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetchAll, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(prefetchAll, 300);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
