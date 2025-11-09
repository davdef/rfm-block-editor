import createRow from "./createRow";
import makeBlock from "./makeBlock";

export default function createRowWithBlock(columnCount, blockType, overrideProps = {}) {
  const row = createRow(columnCount);
  row.columns[0].push(makeBlock(blockType, overrideProps));
  return row;
}
