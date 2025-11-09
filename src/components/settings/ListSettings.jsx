import { useEffect, useState } from "react";

const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" },
  { value: "justify", label: "Blocksatz" }
];

const VARIANT_OPTIONS = [
  { value: "unordered", label: "Aufzählungspunkte" },
  { value: "ordered", label: "Nummerierung" },
  { value: "alphabetic", label: "Buchstaben" }
];

export default function ListSettings({ block, onChange }) {
  const [rawItems, setRawItems] = useState("");

  useEffect(() => {
    const items = block.props.items ?? [];
    setRawItems(items.join("\n"));
  }, [block.props.items]);

  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Einträge (eine Zeile pro Eintrag)
        </span>
        <textarea
          className="w-full border rounded px-2 py-1 text-xs min-h-[120px]"
          value={rawItems}
          onChange={(e) => setRawItems(e.target.value)}
          onBlur={(e) =>
            onChange({
              items: e.target.value
                .split(/\n+/)
                .map((line) => line.trim())
                .filter(Boolean)
            })
          }
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Listenstil
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.variant || "unordered"}
          onChange={(e) => onChange({ variant: e.target.value })}
        >
          {VARIANT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Spalten
        </span>
        <input
          type="number"
          min={1}
          max={3}
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.columns || 1}
          onChange={(e) => onChange({ columns: Number(e.target.value) || 1 })}
        />
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
