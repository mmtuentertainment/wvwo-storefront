// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: Update to wvwildoutdoors.com when domain is purchased
  site: 'https://wvwildoutdoors.pages.dev',
  vite: {
    plugins: [tailwind()],
    build: {
      // SPEC-07 PR #7: Production optimizations
      minify: 'esbuild', // Fast minification (terser requires extra install)
      rollupOptions: {
        output: {
          // Split React into separate vendor chunk for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
  integrations: [react(), sitemap()],
});