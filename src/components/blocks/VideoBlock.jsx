const ALIGN_CLASSNAMES = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right"
};

const RATIO_CLASSNAMES = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square"
};

export default function VideoBlock({ url = "", caption = "", align = "center", ratio = "16:9" }) {
  const alignment = ALIGN_CLASSNAMES[align] || ALIGN_CLASSNAMES.center;
  const ratioClass = RATIO_CLASSNAMES[ratio] || RATIO_CLASSNAMES["16:9"];

  return (
    <div className={`p-4 bg-indigo-50/60 rounded-lg flex flex-col gap-3 ${alignment}`}>
      <div className={`w-full ${ratioClass} bg-black/70 rounded overflow-hidden relative`}>
        {url ? (
          url.includes("youtube") || url.includes("vimeo") ? (
            <iframe
              src={url}
              title={caption || "Video"}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={url}
              controls
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-300">
            Keine Video-URL hinterlegt
          </div>
        )}
      </div>
      {caption && <div className="text-xs text-gray-500">{caption}</div>}
    </div>
  );
}
