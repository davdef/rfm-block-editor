const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" },
  { value: "justify", label: "Blocksatz" }
];

export default function ParagraphSettings({ block, onChange }) {
  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Text
        </span>
        <textarea
          className="w-full border rounded px-2 py-1 text-xs min-h-[100px]"
          value={block.props.content || ""}
          onChange={(e) => onChange({ content: e.target.value })}
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Ausrichtung
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
