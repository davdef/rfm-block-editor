export default function HeadingBlock({ content = "Überschrift", level = 2, align = "left" }) {
  const Tag = `h${level}`;
  return (
    <div className="p-4">
      <Tag style={{ textAlign: align }} className="font-semibold tracking-tight">
        {content}
      </Tag>
    </div>
  );
}
