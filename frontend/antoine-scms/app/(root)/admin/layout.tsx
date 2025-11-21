import { ReactNode } from "react";
import Sidebar from "@/components/left-sidebar";
import AdminGuard from "@/components/adminGuard";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </AdminGuard>
  );
}
