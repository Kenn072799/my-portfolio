import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      watch: {
        awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 100 },
      },
      proxy: {
        '/portfolio-api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/portfolio-api/, ''),
          timeout: 65000,
          proxyTimeout: 65000,
        },
      },
    },
  }
})
