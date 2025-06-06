import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  //base: mode === 'production' ? '/shopping-list/' : '/',
  base: '/shopping-list/',
  plugins: [vue()],
  server: {
    allowedHosts: ['.devenv.local.com', 'localhost'],
  }
}))
