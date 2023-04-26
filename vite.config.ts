/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'Coin Keeper',
    short_name: 'Coin Keeper',
    theme_color: '#2F9E44',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(pwaOptions)],
  server: {
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
    css: true,
  },
})
