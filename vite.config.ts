import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), AutoImport({
    resolvers: [ElementPlusResolver(), IconResolver({ prefix: 'Icon' })],
  }),
  Components({
    resolvers: [ElementPlusResolver(), IconResolver({ enabledCollections: ['ep'] })],
  }),
  Icons({ autoInstall: true })],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
