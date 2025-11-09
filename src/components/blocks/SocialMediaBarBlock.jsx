const STYLE_CLASSNAMES = {
  solid: "bg-slate-900 text-white",
  outline: "border border-slate-300 text-slate-700",
  soft: "bg-slate-100 text-slate-700"
};

const ALIGN_CLASSNAMES = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right"
};

export default function SocialMediaBarBlock({
  networks = [],
  align = "center",
  style = "solid"
}) {
  const styleClasses = STYLE_CLASSNAMES[style] || STYLE_CLASSNAMES.solid;
  const alignClass = ALIGN_CLASSNAMES[align] || ALIGN_CLASSNAMES.center;

  return (
    <div className={`p-4 bg-orange-50/60 rounded-lg`}>
      <div className={`flex flex-wrap gap-2 ${alignClass}`}>
        {networks.length === 0 ? (
          <span className="text-xs text-gray-400">Keine Links hinterlegt</span>
        ) : (
          networks.map((network, index) => (
            <a
              key={index}
              href={network.url || "#"}
              className={`px-3 py-2 rounded text-xs font-semibold transition ${styleClasses} hover:opacity-80`}
              target="_blank"
              rel="noreferrer"
            >
              {network.label || "Social"}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
