import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  optimizeDeps: {
    include: [
      'buffer',
      'process',
      '@stellar/stellar-sdk/contract',
      '@stellar/stellar-sdk/rpc'
    ],
  },
  server: {
    fs: {
      // allow serving files from project root and its parent (for local bindings under /contract)
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
})
