import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
// 这是node的那个写的，我在node项目用这个，在浏览器环境vite的这个去修改import.meta.env.mode的
console.log("process.env =>", process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('当前参数 =>', process.cwd())
  // 这个位置书写的不对，应该使用path那个模块拼接才对因为那个不同电脑不一样的
  const path = process.cwd() + '/env'
  const env = loadEnv(mode, path);
  const { VITE_APP_TITLE, VITE_API_BASE_URL, VITE_NODE_ENV } = env;

  console.log(`当前环境: ${VITE_APP_TITLE}`, VITE_API_BASE_URL, VITE_APP_TITLE, VITE_NODE_ENV)

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
    },
    envDir: 'env'
  }
})
