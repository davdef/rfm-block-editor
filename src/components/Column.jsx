// src/components/Column.jsx
import { Fragment, useState } from "react";
import BlockRenderer from "./BlockRenderer";

const TYPE_ACCENTS = {
  heading: "border-l-blue-500 bg-blue-50",
  paragraph: "border-l-green-500 bg-green-50",
  image: "border-l-amber-500 bg-amber-50"
};

export default function Column({
  rowId,
  colIndex,
  blocks,
  onDrop,
  onSelectBlock,
  activeBlock
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleDrop = (e, insertIndex = null) => {
    e.preventDefault();
    e.stopPropagation();
    setHoverIndex(null);
    const json = e.dataTransfer.getData("application/json");
    if (!json) return;
    const payload = JSON.parse(json);
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
    setHoverIndex((prev) => (index === null ? null : prev === index ? null : prev));
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

  const hasBlocks = blocks.length > 0;
  const highlightColumn = hoverIndex !== null;

  return (
    <div
      onDragOver={(e) => {
        if (!hasBlocks) {
          e.preventDefault();
          setHoverIndex(0);
        }
      }}
      onDragLeave={(e) => handleLeave(e, null)}
      onDrop={(e) => {
        if (!hasBlocks) {
          handleDrop(e, 0);
        }
      }}
      className={`min-h-[90px] rounded-lg border p-3 transition-colors ${
        highlightColumn
          ? "border-blue-500 bg-blue-100/70 shadow-inner"
          : "border-dashed border-gray-300 bg-white"
      }`}
    >
      {!hasBlocks && hoverIndex === null && (
        <div className="text-xs text-gray-400 text-center py-6">
          Block hier ablegen
        </div>
      )}
      {hasBlocks ? renderDropZone(0) : null}
      {blocks.map((block, index) => {
        const isActive =
          activeBlock &&
          activeBlock.rowId === rowId &&
          activeBlock.colIndex === colIndex &&
          activeBlock.blockId === block.id;

        const accent = `${TYPE_ACCENTS[block.type] || "border-l-gray-300 bg-gray-50"}`;

        return (
          <Fragment key={block.id}>
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
              className={`mb-2 rounded-lg cursor-move border-l-4 px-2 py-1 transition shadow-sm ${
                isActive
                  ? "ring-2 ring-blue-500 bg-white"
                  : "hover:shadow-md"
              } ${accent}`}
            >
              <BlockRenderer block={block} />
            </div>
            {renderDropZone(index + 1)}
          </Fragment>
        );
      })}
    </div>
  );
}
