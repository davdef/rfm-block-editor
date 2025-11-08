export default function Toolbar({
  title,
  slug,
  onTitleChange,
  layoutColumns,
  onChangeLayoutColumns,
  onExport
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b bg-white">
      <div className="flex flex-col">
        <input
          className="border rounded px-2 py-1 text-sm"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Artikeltitel …"
        />
        <span className="text-xs text-gray-400">/{slug || "slug"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Spalten:</span>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => onChangeLayoutColumns(n)}
            className={`px-2 py-1 text-sm rounded ${
              layoutColumns === n ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <button
        onClick={onExport}
        className="ml-auto bg-green-500 text-white px-3 py-1 rounded text-sm"
      >
        Export JSON
      </button>
    </div>
  );
}
