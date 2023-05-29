import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

console.log("process.env =>", process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV, VITE_API_BASE_URL, VITE_NODE_ENV } = env;

  console.log(VITE_API_BASE_URL, VITE_APP_ENV, VITE_NODE_ENV)

  return {
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
  }
})
