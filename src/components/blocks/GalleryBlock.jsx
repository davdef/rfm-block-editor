function GalleryImage({ image }) {
  return (
    <figure className="bg-white/70 rounded-md overflow-hidden shadow-sm flex flex-col">
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt || image.caption}
          className="w-full h-32 object-cover"
        />
      ) : (
        <div className="w-full h-32 flex items-center justify-center text-xs text-gray-400 border border-dashed border-slate-200 bg-white/50">
          Kein Bild
        </div>
      )}
      {(image.caption || image.alt) && (
        <figcaption className="text-[11px] text-slate-500 px-2 py-1">
          {image.caption || image.alt}
        </figcaption>
      )}
    </figure>
  );
}

const COLUMN_CLASSNAMES = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};

export default function GalleryBlock({ images = [], columns = 3, gap = "normal" }) {
  const gapClass =
    gap === "wide" ? "gap-4" : gap === "tight" ? "gap-1" : "gap-2";
  const columnClass = COLUMN_CLASSNAMES[Math.min(Math.max(columns, 1), 4)] || COLUMN_CLASSNAMES[3];

  return (
    <div className="p-4 bg-rose-50/60 rounded-lg">
      <div className={`grid grid-cols-1 ${columnClass} ${gapClass}`}>
        {images.length === 0 ? (
          <div className="text-xs text-gray-400 col-span-full text-center">
            Keine Bilder in der Galerie
          </div>
        ) : (
          images.map((image, index) => <GalleryImage key={index} image={image} />)
        )}
      </div>
    </div>
  );
}
