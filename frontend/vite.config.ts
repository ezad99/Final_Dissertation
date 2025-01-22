import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["https://gurujava-frontend.onrender.com/"],
    host: '0.0.0.0',
    port: 4173,
  }
})
