import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["gurujava-frontend.onrender.com","http://localhost:4173/"],
    host: '0.0.0.0',
    port: 5173,
  }
})
