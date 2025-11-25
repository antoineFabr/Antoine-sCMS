import React from "react";
import { artiste } from "@/type/artiste";
import { ArtisteBlockConfig } from "@/type/blocks";

interface ArtisteBlock {
  data: artiste;
  blockProps: ArtisteBlockConfig;
}

export default function ArtisteHeader({ data, blockProps }: ArtisteBlock) {
  const containerStyle = {
    textAlign: blockProps.align, // Sûr d'être 'left', 'center' ou 'right'
    backgroundColor: blockProps.backgroundColor || "#fff", // Valeur par défaut
    padding: "2rem",
  };

  return (
    <div style={containerStyle} className="hero-block">
      {/* Donnée dynamique venant de la DB */}
      <h1 className="text-4xl font-bold">{data.pseudo}</h1>

      {/* Logique conditionnelle basée sur la config JSON */}
      {blockProps.showDescription && (
        <p className="mt-4 text-gray-600">{data.description}</p>
      )}
    </div>
  );
}
