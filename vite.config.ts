import { defineConfig } from 'vitest/config'

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
        purpose: 'any maskable',
      },
    ],
  },
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(pwaOptions)],
  server: {
    host: true,
    port: 8080,
    watch: { usePolling: true },
  },
  define: {
    __APP_ENV__: JSON.stringify(process.env.VITE_VERCEL_ENV),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
    css: true,
  },
})
