const LIST_STYLE_CLASSNAMES = {
  unordered: "list-disc",
  ordered: "list-decimal",
  alphabetic: "list-[lower-alpha]"
};

export default function ListBlock({ items = [], variant = "unordered", columns = 1, align = "left" }) {
  const listClass = LIST_STYLE_CLASSNAMES[variant] || LIST_STYLE_CLASSNAMES.unordered;
  const normalizedColumns = Math.min(Math.max(columns, 1), 3);
  const columnClassMap = {
    1: "",
    2: "md:columns-2",
    3: "md:columns-3"
  };
  const columnClass = columnClassMap[normalizedColumns];

  return (
    <div className="p-4 bg-lime-50/60 rounded-lg">
      {items.length === 0 ? (
        <p className="text-xs text-gray-400">Keine Listenelemente vorhanden</p>
      ) : (
        <ul
          style={{ textAlign: align }}
          className={`${listClass} ${columnClass} pl-5 space-y-1 text-sm leading-relaxed`}
        >
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
