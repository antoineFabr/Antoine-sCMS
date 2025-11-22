"use client";

import type { artiste } from "@/type/artiste";

export default function ArtisteViewComponent({
  artiste,
}: {
  artiste: artiste;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
            {artiste.pseudo?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {artiste.pseudo || "Sans nom"}
            </h1>
            <p className="text-white/80 mt-1">Artiste</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">À propos</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {artiste.description || "Aucune description pour le moment."}
        </p>
      </div>
    </div>
  );
}
