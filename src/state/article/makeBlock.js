import defaultBlockProps from "./defaultBlockProps";

export default function makeBlock(type, overrideProps = {}) {
  return {
    id: `block-${crypto.randomUUID()}`,
    type,
    props: { ...defaultBlockProps(type), ...overrideProps }
  };
}
