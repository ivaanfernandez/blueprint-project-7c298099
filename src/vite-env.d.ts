/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// Custom typing for `?preset=responsive` imports — returns a Picture object
// with format-specific srcSet strings + a fallback <img> source.
declare module "*?preset=responsive" {
  const out: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default out;
}
