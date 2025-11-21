"use client";

import { useEffect, useState } from "react";

type oeuvre = {
  id: number;
  nom: string;
  description: string;
};

export default function ArtistePage() {
  const [artistes, setArtistes] = useState<oeuvre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchArtistes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3333/api/oeuvre", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: oeuvre[] = await response.json();
        setArtistes(data);
      } catch {
        setError("Erreur lors de la récuperation des oeuvres !");
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
        <ul>
          {artistes.map((x) => (
            <li key={x.id}>{x.nom}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
