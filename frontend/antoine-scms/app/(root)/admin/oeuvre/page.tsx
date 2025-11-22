"use client";

import { useEffect, useState } from "react";
import { OeuvreAdminComponent } from "@/components/ui/admin/oeuvre/oeuvreComponent";
import { oeuvre } from "@/type/oeuvre";

export default function OeuvrePage() {
  const [oeuvres, setOeuvres] = useState<oeuvre[]>([]);
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
        setOeuvres(data);
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
        oeuvres.map((x) => <OeuvreAdminComponent key={x.id} oeuvre={x} />)
      )}
    </div>
  );
}
