import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'shared'),
      '@catalog': resolve(__dirname, 'catalog'),
    }
  },
  server: {
    port: 3500,
    strictPort: false,
    open: false
  },
  optimizeDeps: {
    exclude: ['legacy', 'node_modules_old'],
    entries: ['index.html']
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  }
})
