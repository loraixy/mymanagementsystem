import './assets/main.css'
import './taiwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useTagsStore } from './stores/tags'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const tagsStore = useTagsStore()

router.afterEach((to, from, failure) => {
    console.log('main.ts to, from failure =>', to.meta.title, to.meta.permiss, to.fullPath, from, failure)
    const title = to.meta.title as string
    const name = to.name as string
    const isSave = to.meta.isSave as boolean
    const path = to.path as string
    tagsStore.getTagsListItem({
        title,
        name,
        isSave,
        path
    })
})

console.log(' 当前运行模式 ', import.meta.env.MODE)
console.log(' NODE_ENV: ', import.meta.env.VITE_NODE_ENV);
console.log('VITE_APP_TITLE', import.meta.env.VITE_APP_TITLE)

