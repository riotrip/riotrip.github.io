import { defineConfig } from "vite";

export default defineConfig({
  root: "docs",
  base: "./",
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
