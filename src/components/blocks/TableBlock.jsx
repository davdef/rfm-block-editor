export default function TableBlock({ headers = [], rows = [], compact = false, align = "left" }) {
  return (
    <div className="p-4 bg-cyan-50/60 rounded-lg overflow-x-auto">
      <table
        className={`min-w-full text-sm ${compact ? "table-fixed" : "table-auto"}`}
        style={{ textAlign: align }}
      >
        {headers.length > 0 && (
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              {headers.map((header, index) => (
                <th key={index} className="border-b border-slate-200 px-3 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-3 py-4 text-xs text-gray-400" colSpan={Math.max(headers.length, 1)}>
                Keine Tabelleninhalte
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white/60 even:bg-white/30">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 border-b border-slate-100">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
