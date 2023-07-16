import './assets/main.css'
import './taiwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

// 为了告诉 TypeScript 这些新 property，我们需要使用[模块扩充]
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $parentHost: string
        $parentPort: string
    }
}

app.config.globalProperties.$parentPort = import.meta.env.VITE_PARENT_PORT // 父进程端口
app.config.globalProperties.$parentHost = import.meta.env.VITE_PARENT_HOST // 父进程域名


app.use(createPinia())
app.use(router)

app.mount('#app')

// console.log(' 当前运行模式 ', import.meta.env.MODE)
// console.log(' NODE_ENV: ', import.meta.env.VITE_NODE_ENV);
// console.log(import.meta.env.VITE_PARENT_PORT)
// console.log(import.meta.env.VITE_PARENT_HOST)
// console.log('VITE_APP_TITLE', import.meta.env.VITE_APP_TITLE)

