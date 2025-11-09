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
  }
};

export default function defaultBlockProps(type) {
  const props = DEFAULT_PROPS[type];
  return props ? { ...props } : {};
}
