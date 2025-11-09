export default function ensureRowHasColumns(row) {
  return Array.from({ length: row.columnCount }, (_, idx) => {
    const existing = row.columns[idx];
    return existing ? [...existing] : [];
  });
}
