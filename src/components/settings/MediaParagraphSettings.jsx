const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" },
  { value: "justify", label: "Blocksatz" }
];

const POSITION_OPTIONS = [
  { value: "left", label: "Bild links" },
  { value: "right", label: "Bild rechts" },
  { value: "top", label: "Bild oberhalb" },
  { value: "bottom", label: "Bild unterhalb" }
];

export default function MediaParagraphSettings({ block, onChange }) {
  const image = block.props.image || {};

  const updateImage = (partial) => {
    onChange({ image: { ...image, ...partial } });
  };

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
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Bildposition
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.imagePosition || "left"}
          onChange={(e) => onChange({ imagePosition: e.target.value })}
        >
          {POSITION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-1 gap-2">
        <label className="block space-y-1">
          <span className="block text-[11px] uppercase tracking-wide text-gray-400">
            Bild-URL
          </span>
          <input
            className="w-full border rounded px-2 py-1 text-xs"
            value={image.src || ""}
            onChange={(e) => updateImage({ src: e.target.value })}
          />
        </label>
        <label className="block space-y-1">
          <span className="block text-[11px] uppercase tracking-wide text-gray-400">
            Alternativtext
          </span>
          <input
            className="w-full border rounded px-2 py-1 text-xs"
            value={image.alt || ""}
            onChange={(e) => updateImage({ alt: e.target.value })}
          />
        </label>
        <label className="block space-y-1">
          <span className="block text-[11px] uppercase tracking-wide text-gray-400">
            Bildunterschrift
          </span>
          <input
            className="w-full border rounded px-2 py-1 text-xs"
            value={image.caption || ""}
            onChange={(e) => updateImage({ caption: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}
