import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' = relative asset paths, so the build works on GitHub Pages
// whether it is served from https://user.github.io/ or https://user.github.io/repo-name/
export default defineConfig({
  plugins: [react()],
  base: './',
})
