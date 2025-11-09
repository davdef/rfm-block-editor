const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" }
];

const RATIO_OPTIONS = [
  { value: "16:9", label: "16:9" },
  { value: "4:3", label: "4:3" },
  { value: "1:1", label: "1:1" }
];

export default function VideoSettings({ block, onChange }) {
  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Video-URL (YouTube, Vimeo oder Datei)
        </span>
        <input
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.url || ""}
          onChange={(e) => onChange({ url: e.target.value })}
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
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Seitenverhältnis
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.ratio || "16:9"}
          onChange={(e) => onChange({ ratio: e.target.value })}
        >
          {RATIO_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
