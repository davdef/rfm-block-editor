import resizeRowColumns from "./resizeRowColumns";

export default function changeLayoutColumns(article, columnCount) {
  const previousColumns = article.layout.columns;
  const rows = article.rows.map((row) =>
    row.columnCount === previousColumns || row.columnCount == null
      ? resizeRowColumns(row, columnCount)
      : row
  );

  return {
    ...article,
    layout: { ...article.layout, columns: columnCount },
    rows
  };
}
