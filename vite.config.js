import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Sökvägsbas för GitHub Pages: https://momealaouie.github.io/wimed-planner/
  base: '/wimed-planner/',
  plugins: [react()],
})
