import ArtisteHeader from "@/components/blocks/artiste/ArtisteHeader";
import ArtisteBio from "@/components/blocks/artiste/ArtisteBio";
import WorkGrid from "@/components/blocks/artiste/WorksGrid";
import type { artiste } from "@/type/artiste";
import { oeuvre } from "@/type/oeuvre";

const COMPONENT_MAP: Record<string, React.FC<any>> = {
  header: ArtisteHeader,
  bio: ArtisteBio,
  works: WorkGrid,

  // 'text_column': TextColumn,
};
const DEFAULT_LAYOUT = [
  { id: "1", type: "header", props: { theme: "gradient" } },
  { id: "2", type: "bio", props: {} },
  { id: "3", type: "works", props: {} },
];
interface Props {
  artiste: artiste;
  oeuvres: oeuvre[];
}

export default function ArtisteRenderer({ artiste, oeuvres }: Props) {
  const layout = artiste.pageLayout || DEFAULT_LAYOUT;

  return (
    <div className="page-container">
      {layout.map((block) => {
        const Component = COMPONENT_MAP[block.type];
        if (!Component) {
          return null;
        }

        return (
          <Component
            key={block.id}
            data={artiste} // Données de l'artiste
            oeuvres={oeuvres} // Données des oeuvres (si besoin)
            blockProps={block.props}
          />
        );
      })}
    </div>
  );
}
