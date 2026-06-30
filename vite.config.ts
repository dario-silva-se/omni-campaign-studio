/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Local dev: the gateway (auth, rate limit, CRUD proxy, AI) runs on :8787.
// Forwarding these prefixes keeps the browser same-origin with Vite (:5173) so
// the gateway's httpOnly refresh cookie is sent/stored without SameSite issues.
const GATEWAY_TARGET = process.env.VITE_GATEWAY_TARGET ?? 'http://localhost:8787'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    proxy: {
      '/api': { target: GATEWAY_TARGET, changeOrigin: true },
      '/_gw': { target: GATEWAY_TARGET, changeOrigin: true },
      '/ai': { target: GATEWAY_TARGET, changeOrigin: true },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    css: false,
  },
})
