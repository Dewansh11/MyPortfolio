import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Respond with HTML immediately; don't block the first request on full dep pre-bundling.
    preTransformRequests: false,
    watch: {
      ignored: ['**/.git/**', '**/.DS_Store'],
    },
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    holdUntilCrawlEnd: false,
    include: ['framer-motion', 'react', 'react-dom', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
