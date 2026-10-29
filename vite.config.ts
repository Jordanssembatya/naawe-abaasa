/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'AfyaGuide Uganda',
        short_name: 'AfyaGuide',
        description: 'Explore, understand and compare health insurance options in Uganda in plain English.',
        id: '/',
        lang: 'en-UG',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['health', 'finance', 'education'],
        theme_color: '#102B46',
        background_color: '#F5F8FA',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        // Long-press the home-screen icon to jump straight to a tab.
        shortcuts: [
          { name: 'Browse products', short_name: 'Products', url: '/products', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Compare plans', short_name: 'Compare', url: '/compare', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Insurance glossary', short_name: 'Glossary', url: '/glossary', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        // Precache the whole app (product data is bundled), so every page works offline after the first visit.
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
  server: { port: 5173 },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
