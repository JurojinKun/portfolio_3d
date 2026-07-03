import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "vendor-react",
              priority: 40,
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            {
              name: "vendor-router-i18n",
              priority: 30,
              test: /node_modules[\\/](react-router|react-router-dom|i18next|react-i18next|i18next-browser-languagedetector)[\\/]/,
            },
            {
              name: "vendor-three-core",
              priority: 20,
              test: /node_modules[\\/]three[\\/]/,
            },
            {
              name: "vendor-three-react",
              priority: 10,
              test: /node_modules[\\/](@react-three|@pmndrs|troika-three-text|troika-three-utils|troika-worker-utils|webgl-sdf-generator|bidi-js|camera-controls|maath|meshline|stats-gl|suspend-react|use-sync-external-store|zustand)[\\/]/,
            },
          ],
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
