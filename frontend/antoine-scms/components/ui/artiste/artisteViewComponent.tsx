"use client";

import type { artiste } from "@/type/artiste";
import type { oeuvre } from "@/type/oeuvre";
import { useRef } from "react";

export default function ArtisteViewComponent({
  artiste,
  oeuvres,
}: {
  artiste: artiste;
  oeuvres: oeuvre[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-8 text-white mb-8">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

        <div className="relative flex items-center gap-6">
          <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl font-bold shadow-lg border border-white/20">
            {artiste.pseudo?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
              Artiste
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              {artiste.pseudo || "Sans nom"}
            </h1>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          À propos
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
          {artiste.description || "Aucune description pour le moment."}
        </p>
      </div>

      {/* Oeuvres */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Oeuvres
          </h2>

          {oeuvres && oeuvres.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {oeuvres && oeuvres.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {oeuvres.map((x) => (
              <div
                key={x.id}
                className="flex-shrink-0 w-48 group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
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
                <p className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                  {x.nom}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-3"
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
            <p className="text-gray-500">Aucune oeuvre pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
