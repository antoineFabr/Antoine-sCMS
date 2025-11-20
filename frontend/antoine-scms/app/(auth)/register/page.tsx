"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = { mdp: string; mail: string };
export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ mdp: "", mail: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((x) => ({ ...x, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.mail.trim() || !form.mdp) {
      setError("Il faut remplir les champs obligatoires");
    }

    const response = await fetch("http://localhost:3333/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.mail.trim(),
        password: form.mdp,
      }),
    });

    if (response.status != 200) {
      setError("Erreur de création de compte !");
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Créer votre compte</h1>

      <p className="mt-1 text-red-400 text-sm">{error}</p>
      <input
        type="email"
        name="mail"
        placeholder="email"
        value={form.mail}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="mdp"
        placeholder="mot de passe"
        value={form.mdp}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading} className="">
        {loading ? "Inscription en cours ..." : "S'inscrire"}
      </button>
    </form>
  );
}
