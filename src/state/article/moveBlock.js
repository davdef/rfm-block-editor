import createRow from "./createRow";
import ensureRowHasColumns from "./ensureRowHasColumns";

export default function moveBlock(article, source, target) {
  if (target.type === "column") {
    if (
      source.rowId === target.rowId &&
      source.colIndex === target.colIndex
    ) {
      if (
        typeof target.blockIndex !== "number" ||
        target.blockIndex === undefined
      ) {
        return article;
      }
    }
  }

  let movingBlock = null;
  let sourceBlockIndex = null;

  const rowsAfterRemoval = article.rows
    .map((row) => {
      if (row.id !== source.rowId) return row;

      const columns = row.columns.map((col) => {
        return col.filter((block, idx) => {
          if (block.id === source.blockId) {
            movingBlock = block;
            sourceBlockIndex = idx;
            return false;
          }
          return true;
        });
      });

      return {
        ...row,
        columns
      };
    })
    .filter((row) => {
      // Wenn Reihe komplett leer ist, entfernen
      const hasContent = row.columns.some((col) => col.length > 0);
      return hasContent;
    });

  if (!movingBlock) {
    return article;
  }

  if (target.type === "canvas") {
    const newRow = createRow(article.layout.columns);
    newRow.columns[0].push(movingBlock);
    return {
      ...article,
      rows: [...rowsAfterRemoval, newRow]
    };
  }

  const rows = rowsAfterRemoval.map((row) => {
    if (row.id !== target.rowId) return row;

    const columns = ensureRowHasColumns(row);
    const safeIndex = Math.min(target.colIndex, columns.length - 1);
    const nextColumns = columns.map((col, idx) => {
      if (idx !== safeIndex) return col;

      let insertIndex =
        typeof target.blockIndex === "number" ? target.blockIndex : col.length;

      const isSameColumn =
        row.id === source.rowId && source.colIndex === safeIndex;
      if (isSameColumn && sourceBlockIndex !== null && insertIndex > sourceBlockIndex) {
        insertIndex -= 1;
      }

      insertIndex = Math.max(0, Math.min(insertIndex, col.length));

      return [
        ...col.slice(0, insertIndex),
        movingBlock,
        ...col.slice(insertIndex)
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
