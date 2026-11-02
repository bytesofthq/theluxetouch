import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-surface-admin flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

