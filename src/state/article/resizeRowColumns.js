import redistributeBlocks from "./redistributeBlocks";

export default function resizeRowColumns(row, columnCount) {
  if (row.columnCount === columnCount) {
    return row;
  }

  return {
    ...row,
    columnCount,
    columns: redistributeBlocks(row.columns, columnCount)
  };
}
