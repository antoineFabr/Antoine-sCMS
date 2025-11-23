"use client";

import { Palette, Frame } from "lucide-react";

export default function HomePage() {
  const handleNavigate = (section: string) => {
    console.log(`Navigation vers la page: ${section}`);
    // Ici vous pourrez ajouter votre logique de navigation
    // Par exemple avec React Router: navigate(`/${section}`)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-16 tracking-tight">
          Bienvenue sur{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            ArtGallery
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Section Artistes */}
          <div
            onClick={() => handleNavigate("artistes")}
            className="group relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-64">
              <Palette className="w-20 h-20 text-white mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-4xl font-bold text-white mb-3">Artistes</h2>
              <p className="text-white/80 text-center">
                Découvrez les créateurs
              </p>
            </div>
          </div>

          {/* Section Œuvres */}
          <div
            onClick={() => handleNavigate("oeuvres")}
            className="group relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-12 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-64">
              <Frame className="w-20 h-20 text-white mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-4xl font-bold text-white mb-3">Œuvres</h2>
              <p className="text-white/80 text-center">
                Explorez les collections
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
