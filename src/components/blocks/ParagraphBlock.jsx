export default function ParagraphBlock({ content = "Absatz …", align = "left" }) {
  return (
    <div className="p-4">
      <p style={{ textAlign: align }} className="text-sm leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}
