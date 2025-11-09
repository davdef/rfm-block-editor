const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" }
];

export default function ImageSettings({ block, onChange }) {
  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Bild-URL
        </span>
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.src || ""}
          onChange={(e) => onChange({ src: e.target.value })}
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Caption
        </span>
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.caption || ""}
          onChange={(e) => onChange({ caption: e.target.value })}
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Ausrichtung
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.align || "center"}
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
