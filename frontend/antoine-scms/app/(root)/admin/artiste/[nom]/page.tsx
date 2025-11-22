"use client";

import type { artiste } from "@/type/artiste";
import { useEffect, useState } from "react";
import { ArtisteModifyWrapper } from "@/components/ui/admin/artiste/artisteModifyWrapper";
type props = {
  params: Promise<{ nom: string }>;
};

export default function ArtistePage({ params }: props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [artiste, setArtiste] = useState<artiste | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchArtiste = async () => {
      try {
        const { nom } = await params;
        const res = await fetch(`http://localhost:3333/api/artiste/${nom}`);
        if (!res.ok) {
          throw new Error("artiste introuvable");
        }
        const data: artiste = await res.json();
        if (mounted) setArtiste(data);
      } catch (err) {
        if (mounted)
          setError((err as Error).message || "Erreur lors de la récupération");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchArtiste();
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

  if (!artiste) {
    return null;
  }

  return (
    <>
      <ArtisteModifyWrapper artiste={artiste} />
    </>
  );
}
