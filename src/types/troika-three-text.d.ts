declare module "troika-three-text" {
  export function preloadFont(
    options: {
      characters: string | string[];
      font: string;
      sdfGlyphSize?: number;
    },
    callback?: () => void,
  ): void;
}
