import { useEffect, useState } from "react";

const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" }
];

export default function TableSettings({ block, onChange }) {
  const [rawHeaders, setRawHeaders] = useState("");
  const [rawRows, setRawRows] = useState("");

  useEffect(() => {
    const headers = block.props.headers ?? [];
    setRawHeaders(headers.join(", "));
  }, [block.props.headers]);

  useEffect(() => {
    const rows = block.props.rows ?? [];
    setRawRows(rows.map((row) => row.join(" | ")).join("\n"));
  }, [block.props.rows]);

  const handleHeadersChange = (value) => {
    const nextHeaders = value
      .split(/,|\n/)
      .map((entry) => entry.trim())
      .filter(Boolean);
    onChange({ headers: nextHeaders });
  };

  const handleRowsChange = (value) => {
    const columnCount = Math.max((block.props.headers ?? []).length, 1);
    const nextRows = value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const cells = line.split("|").map((cell) => cell.trim());
        if (cells.length < columnCount) {
          return [...cells, ...Array(columnCount - cells.length).fill("")];
        }
        return cells.slice(0, columnCount);
      });
    onChange({ rows: nextRows });
  };

  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Spaltenüberschriften (durch Komma getrennt)
        </span>
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={rawHeaders}
          onChange={(e) => setRawHeaders(e.target.value)}
          onBlur={(e) => handleHeadersChange(e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Zeilen (Zellen mit | trennen)
        </span>
        <textarea
          className="w-full border rounded px-2 py-1 text-xs min-h-[140px] font-mono"
          value={rawRows}
          onChange={(e) => setRawRows(e.target.value)}
          onBlur={(e) => handleRowsChange(e.target.value)}
        />
      </label>
      <label className="inline-flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={Boolean(block.props.compact)}
          onChange={(e) => onChange({ compact: e.target.checked })}
        />
        <span>Spaltenbreite angleichen</span>
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Textausrichtung
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.align || "left"}
          onChange={(e) => onChange({ align: e.target.value })}
        >
          {ALIGN_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
