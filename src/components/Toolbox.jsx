import { useMemo } from "react";
import HeadingSettings from "./settings/HeadingSettings";
import ImageSettings from "./settings/ImageSettings";
import ParagraphSettings from "./settings/ParagraphSettings";
import MediaParagraphSettings from "./settings/MediaParagraphSettings";
import GallerySettings from "./settings/GallerySettings";
import VideoSettings from "./settings/VideoSettings";
import SocialMediaBarSettings from "./settings/SocialMediaBarSettings";
import ListSettings from "./settings/ListSettings";
import TableSettings from "./settings/TableSettings";

const BLOCK_TYPES = [
  { type: "heading", label: "Überschrift" },
  { type: "paragraph", label: "Absatz" },
  { type: "image", label: "Bild" },
  { type: "mediaParagraph", label: "Absatz + Bild" },
  { type: "gallery", label: "Bildergalerie" },
  { type: "video", label: "Video" },
  { type: "socialBar", label: "Social Media" },
  { type: "list", label: "Liste" },
  { type: "table", label: "Tabelle" }
];

export default function Toolbox({
  onAddRowWithBlock,
  article,
  activeBlock,
  onUpdateBlockProps
}) {
  const currentBlock = useMemo(() => {
    if (!activeBlock) return null;
    const row = article.rows.find((r) => r.id === activeBlock.rowId);
    if (!row) return null;
    const col = row.columns[activeBlock.colIndex];
    if (!col) return null;
    return col.find((b) => b.id === activeBlock.blockId) || null;
  }, [activeBlock, article]);

  const renderSettings = () => {
    if (!currentBlock) {
      return <p className="text-xs text-gray-400">Kein Block ausgewählt.</p>;
    }

    const onChange = (props) =>
      onUpdateBlockProps(
        activeBlock.rowId,
        activeBlock.colIndex,
        activeBlock.blockId,
        props
      );

    switch (currentBlock.type) {
      case "heading":
        return <HeadingSettings block={currentBlock} onChange={onChange} />;
      case "paragraph":
        return <ParagraphSettings block={currentBlock} onChange={onChange} />;
      case "image":
        return <ImageSettings block={currentBlock} onChange={onChange} />;
      case "mediaParagraph":
        return <MediaParagraphSettings block={currentBlock} onChange={onChange} />;
      case "gallery":
        return <GallerySettings block={currentBlock} onChange={onChange} />;
      case "video":
        return <VideoSettings block={currentBlock} onChange={onChange} />;
      case "socialBar":
        return <SocialMediaBarSettings block={currentBlock} onChange={onChange} />;
      case "list":
        return <ListSettings block={currentBlock} onChange={onChange} />;
      case "table":
        return <TableSettings block={currentBlock} onChange={onChange} />;
      default:
        return (
          <p className="text-xs text-red-500">
            Für diesen Blocktyp gibt es noch keine Einstellungen.
          </p>
        );
    }
  };

  return (
    <div className="w-80 border-l bg-white flex flex-col">
      <div className="p-4 border-b space-y-3">
        <div>
          <h2 className="font-semibold mb-2 text-sm">Blöcke</h2>
          <div className="grid grid-cols-3 gap-2">
            {BLOCK_TYPES.map((block) => (
              <button
                key={block.type}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify({ kind: "new", blockType: block.type })
                  );
                }}
                onClick={() => onAddRowWithBlock(block.type)}
                className="text-xs bg-slate-100 hover:bg-slate-200 cursor-pointer rounded p-2 text-center font-medium"
              >
                {block.label}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500">
          Tipp: Zieh einen Block aus dem Raster in das Layout oder klicke, um eine neue Zeile anzulegen.
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        <h3 className="font-semibold text-sm">Einstellungen</h3>
        {renderSettings()}
      </div>
    </div>
  );
}
