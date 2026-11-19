import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Use the CommonJS distribution for maximum compatibility with local installs.
    alias: { 'lucide-react': fileURLToPath(new URL('./node_modules/lucide-react/dist/cjs/lucide-react.js', import.meta.url)) }
  }
})
