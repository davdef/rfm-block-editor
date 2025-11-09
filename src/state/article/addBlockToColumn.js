import ensureRowHasColumns from "./ensureRowHasColumns";
import makeBlock from "./makeBlock";

export default function addBlockToColumn(article, rowId, colIndex, blockType) {
  const rows = article.rows.map((row) => {
    if (row.id !== rowId) return row;

    const columns = ensureRowHasColumns(row);
    const safeIndex = Math.min(colIndex, columns.length - 1);
    const nextColumns = columns.map((col, idx) =>
      idx === safeIndex ? [...col, makeBlock(blockType)] : col
    );

    return {
      ...row,
      columns: nextColumns
    };
  });

  return {
    ...article,
    rows
  };
}
