export default function createRow(columnCount, seedColumns = []) {
  const columns = Array.from({ length: columnCount }, (_, idx) => {
    const seed = seedColumns[idx];
    return seed ? [...seed] : [];
  });

  return {
    id: `row-${crypto.randomUUID()}`,
    columnCount,
    columns
  };
}
