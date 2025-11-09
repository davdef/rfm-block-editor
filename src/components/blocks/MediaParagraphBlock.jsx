const POSITION_CLASSNAMES = {
  left: "lg:flex-row",
  right: "lg:flex-row-reverse",
  top: "flex-col",
  bottom: "flex-col-reverse"
};

export default function MediaParagraphBlock({
  content = "Absatz …",
  align = "left",
  image = { src: "", alt: "", caption: "" },
  imagePosition = "left"
}) {
  const positionClass =
    POSITION_CLASSNAMES[imagePosition] || POSITION_CLASSNAMES.left;

  return (
    <div className={`p-4 bg-purple-50/60 rounded-lg flex flex-col gap-4 ${positionClass}`}>
      <div className="flex-1">
        <p
          style={{ textAlign: align }}
          className="text-sm leading-relaxed whitespace-pre-line"
        >
          {content}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center gap-2">
        {image?.src ? (
          <img
            src={image.src}
            alt={image.alt || image.caption}
            className="w-full max-h-64 object-cover rounded-md shadow-sm"
          />
        ) : (
          <div className="w-full aspect-video bg-white/40 border border-dashed border-purple-200 rounded flex items-center justify-center text-xs text-purple-500">
            Kein Bild gesetzt
          </div>
        )}
        {(image?.caption || image?.alt) && (
          <span className="text-xs text-gray-500 text-center">
            {image.caption || image.alt}
          </span>
        )}
      </div>
    </div>
  );
}
