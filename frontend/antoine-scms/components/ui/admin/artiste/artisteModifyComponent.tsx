"use client";

import type { artiste } from "@/type/artiste";
import { useState, useEffect } from "react";

interface ArtisteModifyComponentProps {
  artiste: artiste;
  onUpdate?: (data: artiste) => void;
}

export function ArtisteModifyComponent({
  artiste,
  onUpdate,
}: ArtisteModifyComponentProps) {
  const [form, setForm] = useState<artiste>(artiste);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onUpdate?.(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Modifier l'artiste
      </h3>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label
            htmlFor="pseudo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pseudo
          </label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="pseudo"
            value={form?.pseudo ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={form?.description ?? ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            required
          />
        </div>
      </form>
    </div>
  );
}
