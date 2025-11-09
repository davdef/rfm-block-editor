import ensureRowHasColumns from "./ensureRowHasColumns";
import makeBlock from "./makeBlock";

export default function addBlockToColumn(
  article,
  rowId,
  colIndex,
  blockType,
  blockIndex = null
) {
  const rows = article.rows.map((row) => {
    if (row.id !== rowId) return row;

    const columns = ensureRowHasColumns(row);
    const safeIndex = Math.min(colIndex, columns.length - 1);
    const nextColumns = columns.map((col, idx) => {
      if (idx !== safeIndex) return col;

      const nextBlock = makeBlock(blockType);
      const insertAt = Math.max(
        0,
        Math.min(
          typeof blockIndex === "number" ? blockIndex : col.length,
          col.length
        )
      );

      return [
        ...col.slice(0, insertAt),
        nextBlock,
        ...col.slice(insertAt)
      ];
    });

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
