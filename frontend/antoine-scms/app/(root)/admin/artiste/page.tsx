"use client";

import { useEffect, useState } from "react";
import type { artiste } from "@/type/artiste";
import { ArtisteAdminComponent } from "@/components/ui/admin/artiste/artisteComponent";

export default function ArtistePage() {
  const [artistes, setArtistes] = useState<artiste[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchArtistes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3333/api/artiste", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: artiste[] = await response.json();
        setArtistes(data);
      } catch {
        setError("Erreur lors de la récuperation des artistes !");
      } finally {
        setLoading(false);
      }
    };
    fetchArtistes();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        artistes.map((x) => <ArtisteAdminComponent key={x.id} artiste={x} />)
      )}
    </div>
  );
}
