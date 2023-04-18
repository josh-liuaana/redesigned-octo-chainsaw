import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
