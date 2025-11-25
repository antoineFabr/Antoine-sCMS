import { artiste } from "@/type/artiste";

export default function ArtisteBio({
  data,
  blockProps,
}: {
  data: artiste;
  blockProps: any;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {blockProps.title || "À propos"}
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
        {data.description || "Aucune description pour le moment."}
      </p>
    </div>
  );
}
