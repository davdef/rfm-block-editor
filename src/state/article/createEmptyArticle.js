import createRowWithBlock from "./createRowWithBlock";

export default function createEmptyArticle() {
  const defaultColumns = 2;
  const titleRow = createRowWithBlock(1, "heading", {
    level: 1,
    content: "Titel für den Artikel",
    align: "left"
  });

  return {
    title: "",
    slug: "",
    layout: { columns: defaultColumns },
    rows: [titleRow]
  };
}
