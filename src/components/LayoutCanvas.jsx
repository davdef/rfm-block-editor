// src/components/LayoutCanvas.jsx
import Row from "./Row";

export default function LayoutCanvas({
  article,
  onDrop,
  onSelectBlock,
  activeBlock
}) {
  const handleCanvasDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;
    const payload = JSON.parse(data);
    onDrop({ type: "canvas" })(payload);
  };

  return (
    <div
      className="flex-1 bg-gray-50 overflow-y-auto p-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleCanvasDrop}
    >
      {article.rows.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 text-center text-gray-400">
          Zieh einen Block aus der Toolbox hierher oder klicke dort drauf.
        </div>
      )}

      {article.rows.map((row) => (
        <Row
          key={row.id}
          row={row}
          layoutColumns={article.layout.columns}
          onDrop={onDrop}
          onSelectBlock={onSelectBlock}
          activeBlock={activeBlock}
        />
      ))}
    </div>
  );
}
