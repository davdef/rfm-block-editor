export default function Toolbar({
  title,
  slug,
  onTitleChange,
  layoutColumns,
  onChangeLayoutColumns,
  onExport
}) {
  return (
    <div className="flex items-center gap-6 px-6 py-3 border-b bg-white shadow-sm">
      <div className="flex flex-col gap-1 min-w-[220px]">
        <label className="text-[11px] uppercase tracking-wide text-gray-400">
          Titel
        </label>
        <input
          className="border rounded px-3 py-2 text-sm"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Artikeltitel …"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[180px]">
        <label className="text-[11px] uppercase tracking-wide text-gray-400">
          Slug
        </label>
        <input
          className="border rounded px-3 py-2 text-sm bg-gray-100 text-gray-500"
          value={slug || "slug"}
          readOnly
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Standard-Spalten:</span>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => onChangeLayoutColumns(n)}
            className={`px-3 py-1.5 text-sm rounded border transition-colors ${
              layoutColumns === n
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <button
        onClick={onExport}
        className="ml-auto bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-600"
      >
        Export JSON
      </button>
    </div>
  );
}
