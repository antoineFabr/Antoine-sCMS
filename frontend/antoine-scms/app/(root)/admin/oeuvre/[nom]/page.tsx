"use client";

import type { oeuvre } from "@/type/oeuvre";
import { useEffect, useState } from "react";
import { OeuvreModifyWrapper } from "@/components/ui/admin/oeuvre/oeuvreModifyWrapper";
type props = {
  params: Promise<{ nom: string }>;
};

export default function OeuvrePage({ params }: props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [oeuvre, setOeuvre] = useState<oeuvre | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchOeuvre = async () => {
      try {
        const { nom } = await params;
        const res = await fetch(`http://localhost:3333/api/oeuvre/${nom}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("oeuvre introuvable");
        }
        const data: oeuvre = await res.json();
        if (mounted) {
          setOeuvre(data);
        }
      } catch (err) {
        if (mounted)
          setError((err as Error).message || "Erreur lors de la récupération");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOeuvre();
    return () => {
      mounted = false;
    };
  }, [params]);

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>Error: {error}</div>
      </>
    );
  }

  if (!oeuvre) {
    return null;
  }

  return (
    <>
      <OeuvreModifyWrapper oeuvre={oeuvre} />
    </>
  );
}
