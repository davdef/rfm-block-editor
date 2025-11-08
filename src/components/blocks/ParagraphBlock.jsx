export default function ParagraphBlock({ content = "Absatz …", align = "left" }) {
  return (
    <div className="p-3 bg-green-50 rounded">
      <p
        style={{ textAlign: align }}
        contentEditable
        suppressContentEditableWarning
        className="text-sm leading-relaxed"
      >
        {content}
      </p>
    </div>
  );
}
