// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. Import 'path'

export default defineConfig({
  plugins: [react()],
  // 2. Explicitly set the root to the current directory ('.')
  root: path.resolve(__dirname, './'), 
  build: {
    // 3. Explicitly set the entry file
    rollupOptions: {
        input: 'index.html', 
    },
    outDir: 'dist'
  }
})
