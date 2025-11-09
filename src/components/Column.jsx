// src/components/Column.jsx
import { useState } from "react";
import BlockRenderer from "./BlockRenderer";

const TYPE_ACCENTS = {
  heading: "border-l-4 border-blue-200 bg-blue-50/70",
  paragraph: "border-l-4 border-green-200 bg-green-50/70",
  image: "border-l-4 border-yellow-200 bg-yellow-50/70"
};

export default function Column({
  rowId,
  colIndex,
  blocks,
  onDrop,
  onSelectBlock,
  activeBlock
}) {
  const [isOver, setIsOver] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleDrop = (e, index = null) => {
    e.preventDefault();
    setIsOver(false);
    setHoverIndex(null);
    const json = e.dataTransfer.getData("application/json");
    if (!json) return;
    const payload = JSON.parse(json);
    const insertIndex = typeof index === "number" ? index : blocks.length;
    onDrop({
      type: "column",
      rowId,
      colIndex,
      blockIndex: insertIndex
    })(payload);
  };

  const handleLeave = (event, index) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setHoverIndex((prev) => (prev === index ? null : prev));
  };

  const renderDropZone = (index) => (
    <div
      key={`drop-${index}`}
      onDragOver={(e) => {
        e.preventDefault();
        setHoverIndex(index);
      }}
      onDragLeave={(e) => handleLeave(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      className="relative my-1 h-4"
    >
      <div
        className={`absolute inset-0 rounded-full border border-dashed transition-all ${
          hoverIndex === index
            ? "border-blue-500 bg-blue-300/60 opacity-100"
            : "border-transparent bg-transparent opacity-0"
        }`}
      />
    </div>
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => {
        setIsOver(false);
        setHoverIndex(null);
      }}
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
      {renderDropZone(0)}
      {blocks.map((block, index) => {
        const isActive =
          activeBlock &&
          activeBlock.rowId === rowId &&
          activeBlock.colIndex === colIndex &&
          activeBlock.blockId === block.id;

        const accent = `${TYPE_ACCENTS[block.type] || "border-l-4 border-gray-200 bg-gray-50"}`;

        return (
          <div key={block.id} className="relative">
            <div
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
              className={`mb-3 last:mb-0 rounded-lg cursor-move transition shadow-sm overflow-hidden ${
                isActive
                  ? "ring-2 ring-blue-400 bg-white"
                  : "bg-white/80 hover:bg-white"
              } ${accent}`}
            >
              <BlockRenderer block={block} />
            </div>
            {renderDropZone(index + 1)}
          </div>
        );
      })}
    </div>
  );
}
