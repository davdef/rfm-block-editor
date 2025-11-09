import Column from "./Column";

const COLUMN_OPTIONS = [1, 2, 3];

export default function Row({
  row,
  layoutColumns,
  onDrop,
  onSelectBlock,
  activeBlock,
  onChangeColumns,
  index
}) {
  const columnCount = row.columnCount ?? layoutColumns;
  const columns = Array.from({ length: columnCount }, (_, idx) => row.columns[idx] || []);

  const handleChangeColumns = (count) => {
    if (onChangeColumns) {
      onChangeColumns(row.id, count);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2 text-xs uppercase tracking-wide text-gray-400">
        <span>Abschnitt {index + 1}</span>
        <div className="flex items-center gap-1">
          {COLUMN_OPTIONS.map((count) => (
            <button
              key={count}
              onClick={() => handleChangeColumns(count)}
              className={`px-2 py-1 rounded transition-colors ${
                columnCount === count
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {count} Sp.
            </button>
          ))}
        </div>
      </div>
      <div className={`grid gap-4 p-4`} style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
        {columns.map((colBlocks, idx) => (
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
