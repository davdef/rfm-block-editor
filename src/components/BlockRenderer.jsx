import HeadingBlock from "./blocks/HeadingBlock";
import ImageBlock from "./blocks/ImageBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";

export default function BlockRenderer({ block }) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock {...block.props} />;
    case "paragraph":
      return <ParagraphBlock {...block.props} />;
    case "image":
      return <ImageBlock {...block.props} />;
    default:
      return (
        <div className="p-2 bg-red-50 text-xs text-red-700 rounded">
          Unbekannter Block: {block.type}
        </div>
      );
  }
}
