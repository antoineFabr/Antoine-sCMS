import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSubTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { useState } from "react";

interface ArtisteModifyViewProps {
  children: React.ReactNode;
  blockId: string;
  onUpdate: (id: string, newProps: any) => void;
  currentProps?: any;
}

export default function ArtisteModifyView({
  children,
  blockId,
  onUpdate,
}: ArtisteModifyViewProps) {
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          {/* --- Modification de la Taille du Texte --- */}
          <ContextMenuSub>
            <ContextMenuSubTrigger>Taille du titre</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem
                onClick={() => onUpdate(blockId, { titleSize: "text-6xl" })}
              >
                Grand
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => onUpdate(blockId, { titleSize: "text-4xl" })}
              >
                Moyen
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => onUpdate(blockId, { titleSize: "text-2xl" })}
              >
                Petit
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          {/* --- Modification du Fond --- */}
          <ContextMenuSub>
            <ContextMenuSubTrigger>Fond</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuSub>
                <ContextMenuSubTrigger>Image</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem
                    onClick={() => {
                      const url = prompt("Entrez l'URL de l'image");
                      if (url) onUpdate(blockId, { backgroundImage: url });
                    }}
                  >
                    Par URL...
                  </ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>

              <ContextMenuItem
                onClick={() =>
                  onUpdate(blockId, {
                    backgroundColor: "#f3f4f6",
                    backgroundImage: undefined,
                  })
                }
              >
                Gris clair (Reset image)
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  onUpdate(blockId, {
                    backgroundColor: "#000000",
                    textColor: "#fff",
                    backgroundImage: undefined,
                  })
                }
              >
                Noir
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem
            className="text-red-600"
            onClick={() => onUpdate(blockId, { showTitle: false })}
          >
            Cacher le titre
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
