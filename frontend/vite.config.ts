import { defineConfig } from 'vite'
import path from 'node:path'
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
      '@stellar/stellar-sdk/contract': path.resolve(__dirname, 'node_modules/@stellar/stellar-sdk/contract'),
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
      // Prevent bundler from failing if resolving from outside root; keep it bundled
      external: [],
    },
  },
})
