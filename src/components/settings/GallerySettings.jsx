import { useEffect, useState } from "react";

const GAP_OPTIONS = [
  { value: "tight", label: "Eng" },
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Weit" }
];

export default function GallerySettings({ block, onChange }) {
  const [rawImages, setRawImages] = useState("");

  useEffect(() => {
    const images = block.props.images ?? [];
    setRawImages(
      images
        .map((img) =>
          img.caption ? `${img.src || ""}|${img.caption}` : `${img.src || ""}`
        )
        .join("\n")
    );
  }, [block.props.images]);

  const commitImages = (value) => {
    const nextImages = value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [src, caption] = line.split("|");
        return { src: src?.trim() || "", caption: caption?.trim() || "" };
      });

    onChange({ images: nextImages });
  };

  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Bilder (eine Zeile pro Bild, optional mit |Caption)
        </span>
        <textarea
          className="w-full border rounded px-2 py-1 text-xs min-h-[100px] font-mono"
          value={rawImages}
          onChange={(e) => setRawImages(e.target.value)}
          onBlur={(e) => commitImages(e.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Spalten
        </span>
        <input
          type="number"
          min={1}
          max={4}
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.columns || 3}
          onChange={(e) => onChange({ columns: Number(e.target.value) || 1 })}
        />
      </label>
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Abstand
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.gap || "normal"}
          onChange={(e) => onChange({ gap: e.target.value })}
        >
          {GAP_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
