import { defineConfig } from 'vite'

export default defineConfig({
  root: 'dist',
  build: {
    outDir: '../build',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
})
