export default function redistributeBlocks(columns, columnCount) {
  const flat = columns.flat();
  const nextColumns = Array.from({ length: columnCount }, () => []);

  flat.forEach((block, index) => {
    const targetIndex = index % columnCount;
    nextColumns[targetIndex].push(block);
  });

  return nextColumns;
}
