import createRowWithBlock from "./createRowWithBlock";

export default function addRowWithBlock(article, blockType) {
  const newRow = createRowWithBlock(article.layout.columns, blockType);
  return {
    ...article,
    rows: [...article.rows, newRow]
  };
}
