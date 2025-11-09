import { useEffect, useState } from "react";

const ALIGN_OPTIONS = [
  { value: "left", label: "Links" },
  { value: "center", label: "Zentriert" },
  { value: "right", label: "Rechts" }
];

const STYLE_OPTIONS = [
  { value: "solid", label: "Gefüllt" },
  { value: "outline", label: "Umrandet" },
  { value: "soft", label: "Soft" }
];

export default function SocialMediaBarSettings({ block, onChange }) {
  const [rawNetworks, setRawNetworks] = useState("");

  useEffect(() => {
    const networks = block.props.networks ?? [];
    setRawNetworks(
      networks
        .map((network) =>
          network.url ? `${network.label || ""}|${network.url}` : network.label || ""
        )
        .join("\n")
    );
  }, [block.props.networks]);

  const commitNetworks = (value) => {
    const nextNetworks = value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, url] = line.split("|");
        return { label: label?.trim() || "", url: url?.trim() || "" };
      });

    onChange({ networks: nextNetworks });
  };

  return (
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="block text-[11px] uppercase tracking-wide text-gray-400">
          Netzwerke (Label|URL pro Zeile)
        </span>
        <textarea
          className="w-full border rounded px-2 py-1 text-xs min-h-[100px] font-mono"
          value={rawNetworks}
          onChange={(e) => setRawNetworks(e.target.value)}
          onBlur={(e) => commitNetworks(e.target.value)}
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
          Stil
        </span>
        <select
          className="w-full border rounded px-2 py-1 text-xs"
          value={block.props.style || "solid"}
          onChange={(e) => onChange({ style: e.target.value })}
        >
          {STYLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
