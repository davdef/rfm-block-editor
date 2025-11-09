const DEFAULT_PROPS = {
  heading: {
    level: 2,
    content: "Neue Überschrift",
    align: "left"
  },
  paragraph: {
    content: "Neuer Absatz …",
    align: "left"
  },
  image: {
    src: "",
    caption: "",
    align: "center"
  },
  mediaParagraph: {
    content: "Neuer Absatz mit Bild …",
    align: "left",
    imagePosition: "left",
    image: {
      src: "",
      alt: "",
      caption: ""
    }
  },
  gallery: {
    images: [],
    columns: 3,
    gap: "normal"
  },
  video: {
    url: "",
    caption: "",
    align: "center",
    ratio: "16:9"
  },
  socialBar: {
    networks: [
      { label: "Facebook", url: "" },
      { label: "Instagram", url: "" },
      { label: "LinkedIn", url: "" }
    ],
    align: "center",
    style: "solid"
  },
  list: {
    items: ["Erster Punkt", "Zweiter Punkt"],
    variant: "unordered",
    columns: 1,
    align: "left"
  },
  table: {
    headers: ["Spalte 1", "Spalte 2"],
    rows: [
      ["Inhalt 1", "Inhalt 2"],
      ["Inhalt 3", "Inhalt 4"]
    ],
    compact: false,
    align: "left"
  }
};

function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map(cloneValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, cloneValue(nestedValue)])
    );
  }

  return value;
}

export default function defaultBlockProps(type) {
  const props = DEFAULT_PROPS[type];
  return props ? cloneValue(props) : {};
}
