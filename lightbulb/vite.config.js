import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "MomentumLightbulb",
      formats: ["iife", "es"],
      fileName: (format) => (format === "iife" ? "lightbulb.js" : "lightbulb.esm.js"),
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: "lightbulb.css",
      },
    },
  },
});
