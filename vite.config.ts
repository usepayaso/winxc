import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // The directory where your build files will be generated
    outDir: 'dist', // This will ensure the build output is in the 'dist' folder

    // Public base path (especially useful for GitHub Pages)
    // This will need to be set based on your GitHub repository's name
    // If your repository is 'username/telegram-spinning-wheel', set the base to '/telegram-spinning-wheel/'
    base: '/telegram-spinning-wheel/',  // Adjust this according to your repo name or use '/' if deploying to root
  },
});
