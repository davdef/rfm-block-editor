// src/components/Column.jsx
import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import ImageBlock from "./blocks/ImageBlock";

export default function Column({
  rowId,
  colIndex,
  blocks,
  onDrop,
  onSelectBlock,
  activeBlock
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    const json = e.dataTransfer.getData("application/json");
    if (!json) return;
    const payload = JSON.parse(json);
    onDrop({ type: "column", rowId, colIndex })(payload);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="min-h-[70px] bg-gray-50 rounded border border-dashed border-transparent hover:border-gray-300"
    >
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
            className={`mb-2 rounded cursor-move ${isActive ? "ring-2 ring-blue-400" : ""}`}
          >
            <RenderBlock block={block} />
          </div>
        );
      })}
    </div>
  );
}

function RenderBlock({ block }) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock {...block.props} />;
    case "paragraph":
      return <ParagraphBlock {...block.props} />;
    case "image":
      return <ImageBlock {...block.props} />;
    default:
      return <div className="p-2 bg-red-50 text-xs">Unbekannter Block</div>;
  }
}
