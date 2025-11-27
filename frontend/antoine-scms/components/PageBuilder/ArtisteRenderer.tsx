import ArtisteHeader from "@/components/blocks/artiste/ArtisteHeader";
import ArtisteBio from "@/components/blocks/artiste/ArtisteBio";
import WorkGrid from "@/components/blocks/artiste/WorksGrid";
import type { artiste } from "@/type/artiste";
import { oeuvre } from "@/type/oeuvre";
import ArtisteModifyView from "../ui/admin/artiste/artisteModifiyView";
import { useState } from "react";

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
  const [layout, setLayout] = useState(artiste.pageLayout || DEFAULT_LAYOUT);

  const updateBlock = (blockId: string, newProps: any) => {
    setLayout((prevLayout) =>
      prevLayout.map((block) =>
        block.id === blockId
          ? { ...block, props: { ...block.props, ...newProps } }
          : block
      )
    );
  };
  return (
    <div className="page-container">
      {layout.map((block) => {
        const Component = COMPONENT_MAP[block.type];
        if (!Component) {
          return null;
        }

        return (
          <ArtisteModifyView
            key={block.id}
            blockId={block.id} // 👈 On passe l'ID
            onUpdate={updateBlock} // 👈 On passe la fonction de mise à jour
            currentProps={block.props}
          >
            <Component
              data={artiste}
              oeuvres={oeuvres}
              blockProps={block.props}
            />
          </ArtisteModifyView>
        );
      })}
    </div>
  );
}
