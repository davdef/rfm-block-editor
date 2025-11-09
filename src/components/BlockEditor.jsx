// src/components/BlockEditor.jsx
import LayoutCanvas from "./LayoutCanvas";
import Toolbar from "./Toolbar";
import Toolbox from "./Toolbox";
import useArticleEditor from "../state/article/useArticleEditor";

export default function BlockEditor() {
  const {
    article,
    activeBlock,
    updateTitle,
    updateLayoutColumns,
    addRow,
    handleDropOn,
    selectBlock,
    patchBlockProps,
    changeColumnsForRow
  } = useArticleEditor();

  return (
    <div className="flex flex-col h-full">
      <Toolbar
        title={article.title}
        slug={article.slug}
        onTitleChange={updateTitle}
        layoutColumns={article.layout.columns}
        onChangeLayoutColumns={updateLayoutColumns}
        onExport={() => alert(JSON.stringify(article, null, 2))}
      />
      <div className="flex flex-1 overflow-hidden bg-slate-100">
        <LayoutCanvas
          article={article}
          onDrop={handleDropOn}
          onSelectBlock={selectBlock}
          activeBlock={activeBlock}
          onChangeRowColumns={changeColumnsForRow}
        />
        <Toolbox
          onAddRowWithBlock={addRow}
          article={article}
          activeBlock={activeBlock}
          onUpdateBlockProps={patchBlockProps}
        />
      </div>
    </div>
  );
}
