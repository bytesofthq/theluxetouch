import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/** Dedupes getSession within a single RSC request tree. */
export const getAdminSession = cache(async () => {
  const reqHeaders = await headers();
  return auth.api.getSession({ headers: reqHeaders });
});
