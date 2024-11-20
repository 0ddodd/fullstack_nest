import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1024,

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },

    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      'apollo-upload-client': 'apollo-upload-client/createUploadLink.mjs'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'other-heavily-used-libraries']
  }
})
