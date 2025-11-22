"use client";

import type { oeuvre } from "@/type/oeuvre";
import { useState } from "react";
import { OeuvreModifyComponent } from "@/components/ui/admin/oeuvre/oeuvreModifyComponent";
import { OeuvreViewComponent } from "@/components/ui/oeuvre/oeuvreViewComponent"; // ou ton composant d'affichage public

export function OeuvreModifyWrapper({ oeuvre }: { oeuvre: oeuvre }) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [oeuvreData, setOeuvreData] = useState<oeuvre>(oeuvre);
  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3333/api/oeuvre/${oeuvre.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: oeuvreData.nom,
          description: oeuvreData.description,
        }),
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Onglets style GitHub */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-0" aria-label="Tabs">
          <button
            onClick={() => setMode("edit")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              mode === "edit"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </span>
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              mode === "preview"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </span>
          </button>

          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors"
          >
            Enregistrer
          </button>
        </nav>
      </div>

      {/* Contenu */}
      <div className="mt-4">
        {mode === "edit" ? (
          <OeuvreModifyComponent oeuvre={oeuvreData} onUpdate={setOeuvreData} />
        ) : (
          <OeuvreViewComponent oeuvre={oeuvre} />
        )}
      </div>
    </div>
  );
}
