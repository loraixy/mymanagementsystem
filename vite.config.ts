import { fileURLToPath, URL } from 'node:url'
// 引入path处理文件路径
import path from 'path'

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

  // 这个位置书写的不对，应该使用path那个模块拼接才对因为那个不同电脑不一样的
  // const envPath = process.cwd() + 'env'
  // 新的
  const envPath = path.resolve(process.cwd(), 'env')
  // 加载env
  console.log('当前参数 =>', envPath)
  // loadEnv用于加载env文件的东西
  const env = loadEnv(mode, envPath)

  const { VITE_APP_TITLE, VITE_API_BASE_URL, VITE_NODE_ENV } = env

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
    server: {
      proxy: {
        '/api': { // 匹配请求路径，localhost:3000/snow
          target: VITE_API_BASE_URL, // 代理的目标地址
          changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
          // secure: true, // 是否https接口
          // ws: true, // 是否代理websockets
          // rewrite target目标地址 + '/abc'，如果接口是这样的，那么不用重写
          rewrite: (path) => path.replace(/^\/api/, '') // 路径
        }
      }
    },
    // 指定.env所在的文件位置
    envDir: 'env'
  }
})
