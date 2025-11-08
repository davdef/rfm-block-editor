export default function HeadingBlock({ content = "Überschrift", level = 2, align = "left" }) {
  const Tag = `h${level}`;
  return (
    <div className="p-3 bg-blue-50 rounded">
      <Tag
        style={{ textAlign: align }}
        className="font-semibold"
        contentEditable
        suppressContentEditableWarning
      >
        {content}
      </Tag>
    </div>
  );
}
