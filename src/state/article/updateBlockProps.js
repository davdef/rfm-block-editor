export default function updateBlockProps(article, rowId, colIndex, blockId, newProps) {
  const rows = article.rows.map((row) => {
    if (row.id !== rowId) return row;

    const columns = row.columns.map((col, idx) => {
      if (idx !== colIndex) return col;

      return col.map((block) =>
        block.id === blockId
          ? { ...block, props: { ...block.props, ...newProps } }
          : block
      );
    });

    return {
      ...row,
      columns
    };
  });

  return {
    ...article,
    rows
  };
}
