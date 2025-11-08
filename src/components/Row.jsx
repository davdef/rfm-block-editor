import Column from "./Column";

export default function Row({
  row,
  layoutColumns,
  onDrop,
  onSelectBlock,
  activeBlock
}) {
  // falls row.columns weniger oder mehr hat als layoutColumns → anpassen
  const cols = Array.from({ length: layoutColumns }, (_, idx) => row.columns[idx] || []);

  return (
    <div className="mb-4 bg-white rounded-lg shadow-sm p-4">
      <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${layoutColumns}, minmax(0, 1fr))` }}>
        {cols.map((colBlocks, idx) => (
          <Column
            key={idx}
            rowId={row.id}
            colIndex={idx}
            blocks={colBlocks}
            onDrop={onDrop}
            onSelectBlock={onSelectBlock}
            activeBlock={activeBlock}
          />
        ))}
      </div>
    </div>
  );
}
