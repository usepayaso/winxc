import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the build output goes to the 'dist' folder
  },
  base: '/winxc/',  // Set the base URL for GitHub Pages
});
