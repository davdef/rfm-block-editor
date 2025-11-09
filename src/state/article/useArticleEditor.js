import { useCallback, useState } from "react";
import { slugify } from "../../utils/slugify";
import addBlockToColumn from "./addBlockToColumn";
import addRowWithBlock from "./addRowWithBlock";
import changeLayoutColumns from "./changeLayoutColumns";
import changeRowColumns from "./changeRowColumns";
import createEmptyArticle from "./createEmptyArticle";
import moveBlock from "./moveBlock";
import updateBlockProps from "./updateBlockProps";

export default function useArticleEditor() {
  const [article, setArticle] = useState(() => createEmptyArticle());
  const [activeBlock, setActiveBlock] = useState(null);

  const updateTitle = useCallback((title) => {
    setArticle((prev) => ({
      ...prev,
      title,
      slug: title ? slugify(title) : ""
    }));
  }, []);

  const updateLayoutColumns = useCallback((columns) => {
    setArticle((prev) => changeLayoutColumns(prev, columns));
  }, []);

  const addRow = useCallback((blockType) => {
    setArticle((prev) => addRowWithBlock(prev, blockType));
  }, []);

  const addBlock = useCallback((rowId, colIndex, blockType) => {
    setArticle((prev) => addBlockToColumn(prev, rowId, colIndex, blockType));
  }, []);

  const moveExistingBlock = useCallback((source, target) => {
    setArticle((prev) => moveBlock(prev, source, target));
  }, []);

  const handleDropOn = useCallback(
    (target) => (payload) => {
      if (payload.kind === "new") {
        if (target.type === "canvas") {
          addRow(payload.blockType);
        }
        if (target.type === "column") {
          addBlock(target.rowId, target.colIndex, payload.blockType);
        }
      }

      if (payload.kind === "existing") {
        moveExistingBlock(payload, target);
      }
    },
    [addBlock, addRow, moveExistingBlock]
  );

  const selectBlock = useCallback((rowId, colIndex, blockId) => {
    setActiveBlock({ rowId, colIndex, blockId });
  }, []);

  const patchBlockProps = useCallback((rowId, colIndex, blockId, props) => {
    setArticle((prev) => updateBlockProps(prev, rowId, colIndex, blockId, props));
  }, []);

  const changeColumnsForRow = useCallback((rowId, columnCount) => {
    setArticle((prev) => changeRowColumns(prev, rowId, columnCount));
  }, []);

  return {
    article,
    activeBlock,
    updateTitle,
    updateLayoutColumns,
    addRow,
    handleDropOn,
    selectBlock,
    patchBlockProps,
    changeColumnsForRow
  };
}
