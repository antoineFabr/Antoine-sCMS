"use client";

import type { oeuvre } from "@/type/oeuvre";

export function OeuvreViewComponent({ oeuvre }: { oeuvre: oeuvre }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header avec image */}
      <div className="relative overflow-hidden rounded-3xl mb-8">
        <div className="aspect-video bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
          <svg
            className="w-24 h-24 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Titre sur l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2">
            Oeuvre
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {oeuvre.nom || "Sans titre"}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description - 2 colonnes */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {oeuvre.description || "Aucune description pour le moment."}
            </p>
          </div>
        </div>

        {/* Sidebar - 1 colonne */}
        <div className="space-y-6">
          {/* Infos */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Informations
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Identifiant</dt>
                <dd className="text-gray-900 font-medium">#{oeuvre.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Nom</dt>
                <dd className="text-gray-900 font-medium">{oeuvre.nom}</dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors">
                Contacter l'artiste
              </button>
              <button className="w-full px-4 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
