import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminRoutePrefetcher } from "@/components/admin/AdminRoutePrefetcher";
import { NavigationProgress } from "@/components/website/NavigationProgress";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <AdminRoutePrefetcher />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
