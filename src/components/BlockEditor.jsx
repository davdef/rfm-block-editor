// src/components/BlockEditor.jsx
import { useState } from "react";
import { slugify } from "../utils/slugify";
import Toolbar from "./Toolbar";
import Toolbox from "./Toolbox";
import LayoutCanvas from "./LayoutCanvas";

export default function BlockEditor() {
  const [article, setArticle] = useState({
    title: "",
    slug: "",
    layout: { columns: 2 },
    rows: []
  });

  const [activeBlock, setActiveBlock] = useState(null);

  const updateTitle = (title) => {
    setArticle((prev) => ({
      ...prev,
      title,
      slug: title ? slugify(title) : prev.slug
    }));
  };

  const changeLayoutColumns = (num) => {
    setArticle((prev) => ({
      ...prev,
      layout: { ...prev.layout, columns: num }
    }));
  };

  // NEU: neuen Block in bestehende row/col
  const addBlockToRowCol = (rowId, colIndex, blockType) => {
    setArticle((prev) => {
      const rows = prev.rows.map((row) => {
        if (row.id !== rowId) return row;
        const columns = row.columns.map((col, idx) => {
          if (idx !== colIndex) return col;
          return [...col, makeBlock(blockType)];
        });
        return { ...row, columns };
      });
      return { ...prev, rows };
    });
  };

  // NEU: komplett neue Zeile anlegen
  const addRowWithBlock = (blockType) => {
    const id = "row-" + crypto.randomUUID();
    const cols = Array.from({ length: article.layout.columns }, () => []);
    cols[0].push(makeBlock(blockType));
    setArticle((prev) => ({
      ...prev,
      rows: [...prev.rows, { id, columns: cols }]
    }));
  };

  // WICHTIG: zentraler Drop-Handler
  const handleDropOn = (target) => (payload) => {
    // payload = { kind: "new", blockType } ODER { kind: "existing", ... }
    if (payload.kind === "new") {
      if (target.type === "canvas") {
        // auf leere Fläche
        addRowWithBlock(payload.blockType);
      } else if (target.type === "column") {
        addBlockToRowCol(target.rowId, target.colIndex, payload.blockType);
      }
    } else if (payload.kind === "existing") {
      // verschieben
      moveBlock(payload, target);
    }
  };

  // Block verschieben: aus source row/col raus, in target rein
    const moveBlock = (source, target) => {
      setArticle((prev) => {
        // 1. gleicher Ort? Dann abbrechen
        if (
          target.type === "column" &&
          source.rowId === target.rowId &&
          source.colIndex === target.colIndex
        ) {
          return prev;
        }
    
        let movingBlock = null;
    
        // 2. Quelle leeren
        const rowsAfterRemoval = prev.rows.map((row) => {
          if (row.id !== source.rowId) return row;
          const columns = row.columns.map((col, idx) => {
            if (idx !== source.colIndex) return col;
            const filtered = col.filter((b) => {
              if (b.id === source.blockId) {
                movingBlock = b;
                return false;
              }
              return true;
            });
            return filtered;
          });
          return { ...row, columns };
        });
    
        // falls wir den Block nicht gefunden haben → nichts tun
        if (!movingBlock) return prev;
    
        // 3. Ziel einsetzen
        if (target.type === "canvas") {
          const id = "row-" + crypto.randomUUID();
          const cols = Array.from({ length: prev.layout.columns }, () => []);
          cols[0].push(movingBlock);
          return {
            ...prev,
            rows: [...rowsAfterRemoval, { id, columns: cols }]
          };
        }
    
        if (target.type === "column") {
          const rows = rowsAfterRemoval.map((row) => {
            if (row.id !== target.rowId) return row;
            const columns = row.columns.map((col, idx) => {
              if (idx !== target.colIndex) return col;
              // ans Ende der Zielspalte anhängen
              return [...col, movingBlock];
            });
            return { ...row, columns };
          });
          return { ...prev, rows };
        }
    
        return prev;
      });
    };

  const handleSelectBlock = (rowId, colIndex, blockId) => {
    setActiveBlock({ rowId, colIndex, blockId });
  };

  const handleUpdateBlockProps = (rowId, colIndex, blockId, newProps) => {
    setArticle((prev) => {
      const rows = prev.rows.map((row) => {
        if (row.id !== rowId) return row;
        const columns = row.columns.map((col, idx) => {
          if (idx !== colIndex) return col;
          return col.map((block) =>
            block.id === blockId
              ? { ...block, props: { ...block.props, ...newProps } }
              : block
          );
        });
        return { ...row, columns };
      });
      return { ...prev, rows };
    });
  };

  return (
    <div className="flex flex-col h-full">
      <Toolbar
        title={article.title}
        slug={article.slug}
        onTitleChange={updateTitle}
        layoutColumns={article.layout.columns}
        onChangeLayoutColumns={changeLayoutColumns}
        onExport={() => alert(JSON.stringify(article, null, 2))}
      />
      <div className="flex flex-1 overflow-hidden">
        <LayoutCanvas
          article={article}
          onDrop={handleDropOn}   // <-- wichtig
          onSelectBlock={handleSelectBlock}
          activeBlock={activeBlock}
        />
        <Toolbox
          onAddRowWithBlock={addRowWithBlock}
          article={article}
          activeBlock={activeBlock}
          onUpdateBlockProps={handleUpdateBlockProps}
        />
      </div>
    </div>
  );
}

function makeBlock(type) {
  return {
    id: "block-" + crypto.randomUUID(),
    type,
    props: defaultPropsFor(type)
  };
}

function defaultPropsFor(type) {
  switch (type) {
    case "heading":
      return { level: 2, content: "Neue Überschrift", align: "left" };
    case "paragraph":
      return { content: "Neuer Absatz …", align: "left" };
    case "image":
      return { src: "", caption: "", align: "center" };
    default:
      return {};
  }
}
