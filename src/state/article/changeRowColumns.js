import resizeRowColumns from "./resizeRowColumns";

export default function changeRowColumns(article, rowId, columnCount) {
  const rows = article.rows.map((row) =>
    row.id === rowId ? resizeRowColumns(row, columnCount) : row
  );

  return {
    ...article,
    rows
  };
}
