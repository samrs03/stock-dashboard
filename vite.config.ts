import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*'],
      manifest: {
        name: 'PWA Stock Tracker',
        short_name: 'Stock PWA',
        theme_color: '#4f46e5',
        background_color: '#1f2937',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          //faltan iconos
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
});
