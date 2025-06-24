import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/public': fileURLToPath(new URL('./public', import.meta.url)),
      '@/presentation': fileURLToPath(new URL('./src/presentation', import.meta.url)),
      '@/infraestructure': fileURLToPath(new URL('./src/infraestructure', import.meta.url)),
      '@/assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    }
  }
})