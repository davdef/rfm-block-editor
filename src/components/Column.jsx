// src/components/Column.jsx
import { useState } from "react";
import BlockRenderer from "./BlockRenderer";

export default function Column({
  rowId,
  colIndex,
  blocks,
  onDrop,
  onSelectBlock,
  activeBlock
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const json = e.dataTransfer.getData("application/json");
    if (!json) return;
    const payload = JSON.parse(json);
    onDrop({ type: "column", rowId, colIndex })(payload);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`min-h-[90px] rounded border transition-colors ${
        isOver
          ? "border-blue-300 bg-blue-50/50"
          : "border-dashed border-gray-200 bg-gray-50"
      }`}
    >
      {blocks.length === 0 && (
        <div className="text-xs text-gray-400 text-center py-6">
          Block hier ablegen
        </div>
      )}
      {blocks.map((block) => {
        const isActive =
          activeBlock &&
          activeBlock.rowId === rowId &&
          activeBlock.colIndex === colIndex &&
          activeBlock.blockId === block.id;

        return (
          <div
            key={block.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "application/json",
                JSON.stringify({
                  kind: "existing",
                  rowId,
                  colIndex,
                  blockId: block.id
                })
              );
            }}
            onClick={() => onSelectBlock(rowId, colIndex, block.id)}
            className={`mb-3 last:mb-0 rounded-lg cursor-move transition shadow-sm ${
              isActive
                ? "ring-2 ring-blue-400 bg-white"
                : "bg-white/80 hover:bg-white"
            }`}
          >
            <BlockRenderer block={block} />
          </div>
        );
      })}
    </div>
  );
}
