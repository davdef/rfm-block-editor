export default function ImageBlock({ src = "", caption = "" }) {
  return (
    <div className="p-3 bg-yellow-50 rounded text-center">
      {src ? (
        <img src={src} alt={caption} className="mx-auto max-h-40 object-contain rounded" />
      ) : (
        <div className="text-xs text-gray-400 italic">Kein Bild gesetzt</div>
      )}
      {caption && <div className="text-xs text-gray-600 mt-1">{caption}</div>}
    </div>
  );
}
