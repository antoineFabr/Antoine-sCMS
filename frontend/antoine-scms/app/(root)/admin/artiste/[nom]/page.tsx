"use client";

import type { artiste } from "@/type/artiste";
import type { oeuvre } from "@/type/oeuvre";
import { useEffect, useState } from "react";
import { ArtisteModifyWrapper } from "@/components/ui/admin/artiste/artisteModifyWrapper";
type props = {
  params: Promise<{ nom: string }>;
};

export default function ArtistePage({ params }: props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [artiste, setArtiste] = useState<artiste | null>(null);
  const [oeuvres, setOeuvre] = useState<oeuvre[] | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchArtiste = async () => {
      try {
        const { nom } = await params;
        const resOeuvre = await fetch(
          `http://localhost:3333/api/artiste/${nom}/oeuvre`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const resArtiste = await fetch(
          `http://localhost:3333/api/artiste/${nom}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!resArtiste.ok) {
          throw new Error("artiste introuvable");
        }
        if (!resOeuvre.ok) {
          throw new Error("artiste introuvable");
        }
        const dataOeuvres: oeuvre[] = await resOeuvre.json();
        const dataArtiste: artiste = await resArtiste.json();
        if (mounted) {
          setArtiste(dataArtiste);
          setOeuvre(dataOeuvres);
        }
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
      <ArtisteModifyWrapper oeuvres={oeuvres ?? []} artiste={artiste} />
    </>
  );
}
