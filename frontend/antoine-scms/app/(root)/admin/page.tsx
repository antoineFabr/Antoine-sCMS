"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return <div>Chargement....</div>;
  }

  if (!isAdmin) {
    return null;
  }
  return (
    <>
      <h1>Admin Dashboard</h1>

      <p>Bienvenue, {user?.id}</p>
      <p>Role: {user?.role}</p>
    </>
  );
}
