const ALIGN_CLASSNAMES = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right"
};

export default function ImageBlock({ src = "", caption = "", align = "center" }) {
  const alignment = ALIGN_CLASSNAMES[align] || ALIGN_CLASSNAMES.center;

  return (
    <div className={`p-4 flex flex-col gap-2 ${alignment}`}>
      {src ? (
        <img src={src} alt={caption} className="max-h-48 object-contain rounded shadow-sm" />
      ) : (
        <div className="text-xs text-gray-400 italic">Kein Bild gesetzt</div>
      )}
      {caption && <div className="text-xs text-gray-600">{caption}</div>}
    </div>
  );
}
