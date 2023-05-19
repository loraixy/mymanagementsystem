# mymanagementsystem
第一次写的，工作碰到总结一下
## 这个项目使用了最基本的是vue3 + ts + vite + pinia , 样式方面，
## 预编译使用sass，taiwindcss,ui暂时引入了element-plus, 之后会加入vex-table 还有一些裁剪等

### 配置tsconfig.json

```json
// 具体数据详情自己查了
{
  "compilerOptions": {
    // "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "node",
    // "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    /* builder */ 
    "outDir": "./built",
            "allowJs": true,
            "target": "es5",
            "types": [
              "vite/client",
              "element-plus/global"
            ],
  },

  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

### 引入element-plus

```sh
npm install element-plus -save

# 按需导入
npm install -D unplugin-vue-components unplugin-auto-import

```

```js
//  vite 引入unplugin-vue-components unplugin-auto-import , 在 vite.config.ts 中, Webpack 自行看官网
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
     // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})

```

### 引入elementplus图标
see (https://www.yyyi1.cn/detail?id=63e65183982003a0a19bbe23)


### 引入taiwindcss
See [这个是百度的,vue3 + vite 配置taiwindcss](https://juejin.cn/post/7173549978580123656).
