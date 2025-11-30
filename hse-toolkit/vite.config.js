import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' 

export default defineConfig({
  // 🎯 CRITICAL FIX: Add this line to set the base URL for asset loading
  base: '/',
  plugins: [react()],
  root: path.resolve(__dirname, './'),
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    outDir: 'dist'
  }
})
