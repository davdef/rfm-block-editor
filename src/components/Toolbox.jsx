import { useMemo } from "react";

const BLOCK_TYPES = [
  { type: "heading", label: "Überschrift" },
  { type: "paragraph", label: "Absatz" },
  { type: "image", label: "Bild" }
  // später: Galerie, Video, Liste, Tabelle ...
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

  return (
    <div className="w-72 border-l bg-white flex flex-col">
      <div className="p-3 border-b">
        <h2 className="font-semibold mb-2 text-sm">Blöcke</h2>
        <div className="grid grid-cols-3 gap-2">
          {BLOCK_TYPES.map((b) => (
            <div
              key={b.type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({ kind: "new", blockType: b.type })
                );
              }}
              onClick={() => onAddRowWithBlock(b.type)}
              className="text-xs bg-gray-100 hover:bg-gray-200 cursor-pointer rounded p-2 text-center"
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        <h3 className="font-semibold text-sm mb-2">Einstellungen</h3>
        {!currentBlock && (
          <p className="text-xs text-gray-400">Kein Block ausgewählt.</p>
        )}

        {currentBlock && currentBlock.type === "heading" && (
          <HeadingSettings
            block={currentBlock}
            onChange={(props) =>
              onUpdateBlockProps(
                activeBlock.rowId,
                activeBlock.colIndex,
                activeBlock.blockId,
                props
              )
            }
          />
        )}

        {currentBlock && currentBlock.type === "paragraph" && (
          <ParagraphSettings
            block={currentBlock}
            onChange={(props) =>
              onUpdateBlockProps(
                activeBlock.rowId,
                activeBlock.colIndex,
                activeBlock.blockId,
                props
              )
            }
          />
        )}

        {currentBlock && currentBlock.type === "image" && (
          <ImageSettings
            block={currentBlock}
            onChange={(props) =>
              onUpdateBlockProps(
                activeBlock.rowId,
                activeBlock.colIndex,
                activeBlock.blockId,
                props
              )
            }
          />
        )}
      </div>
    </div>
  );
}

function HeadingSettings({ block, onChange }) {
  return (
    <div className="space-y-2 text-xs">
      <label className="block">
        Text
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.content || ""}
          onChange={(e) => onChange({ content: e.target.value })}
        />
      </label>
      <label className="block">
        Ebene
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.level || 2}
          onChange={(e) => onChange({ level: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <option key={l} value={l}>
              H{l}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function ParagraphSettings({ block, onChange }) {
  return (
    <div className="space-y-2 text-xs">
      <label className="block">
        Text
        <textarea
          className="w-full border rounded px-2 py-1 text-xs min-h-[80px]"
          value={block.props.content || ""}
          onChange={(e) => onChange({ content: e.target.value })}
        />
      </label>
    </div>
  );
}

function ImageSettings({ block, onChange }) {
  return (
    <div className="space-y-2 text-xs">
      <label className="block">
        Bild-URL
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.src || ""}
          onChange={(e) => onChange({ src: e.target.value })}
        />
      </label>
      <label className="block">
        Caption
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.caption || ""}
          onChange={(e) => onChange({ caption: e.target.value })}
        />
      </label>
    </div>
  );
}

