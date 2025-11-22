"use client";

import type { artiste } from "@/type/artiste";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function ArtisteAdminComponent({ artiste }: { artiste: artiste }) {
  const router = useRouter();
  const modify = () => {};
  const destroy = () => {};
  const pathname = usePathname();
  const goToPage = () => {
    router.push(`/admin/artiste/${artiste.pseudo}`);
  };
  return (
    <div
      onClick={goToPage}
      className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition cursor-pointer space-y-3"
    >
      <h3 className="text-lg font-semibold text-gray-900">{artiste.pseudo}</h3>

      <p className="text-sm text-gray-600 line-clamp-2">
        {artiste.description}
      </p>

      <div
        className="flex gap-4 text-sm pt-2"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}
