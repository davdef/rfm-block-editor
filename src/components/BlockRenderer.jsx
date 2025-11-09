import HeadingBlock from "./blocks/HeadingBlock";
import ImageBlock from "./blocks/ImageBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import MediaParagraphBlock from "./blocks/MediaParagraphBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import VideoBlock from "./blocks/VideoBlock";
import SocialMediaBarBlock from "./blocks/SocialMediaBarBlock";
import ListBlock from "./blocks/ListBlock";
import TableBlock from "./blocks/TableBlock";

export default function BlockRenderer({ block }) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock {...block.props} />;
    case "paragraph":
      return <ParagraphBlock {...block.props} />;
    case "image":
      return <ImageBlock {...block.props} />;
    case "mediaParagraph":
      return <MediaParagraphBlock {...block.props} />;
    case "gallery":
      return <GalleryBlock {...block.props} />;
    case "video":
      return <VideoBlock {...block.props} />;
    case "socialBar":
      return <SocialMediaBarBlock {...block.props} />;
    case "list":
      return <ListBlock {...block.props} />;
    case "table":
      return <TableBlock {...block.props} />;
    default:
      return (
        <div className="p-2 bg-red-50 text-xs text-red-700 rounded">
          Unbekannter Block: {block.type}
        </div>
      );
  }
}
