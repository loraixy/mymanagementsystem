import './assets/main.css'
import './taiwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

console.log(' NODE_ENV: ', import.meta.env.VITE_NODE_ENV);
console.log('VITE_APP_TITLE', import.meta.env.VITE_APP_TITLE)

