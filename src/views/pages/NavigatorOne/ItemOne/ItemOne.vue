<script setup lang="ts">
import { ref, toRaw } from 'vue'

import ItemOneHeader from './components/ItemOneHeader.vue';
const title = ref('')
const images = ref('')
const age = ref(12)

let baseUrl: string = ''

if (import.meta.env.VITE_NODE_ENV === 'production') {
    baseUrl = import.meta.env.VITE_API_BASE_URL
} else {
    baseUrl = '/api'
}

fetch(baseUrl + '/zhihudaily/story/9741200').then(req => req.json()).then(res => {
    console.log('数据测试', res.story.image)
    title.value = res.story.title
    images.value = res.story.image
})

const ageFn = (val: number): void => {
    age.value = val
}

const testData = ref('nihao')

const s = toRaw(testData)

</script>

<template>
    <div class="item-one overflow-y-auto ">
        <ItemOneHeader :age="age" @age-fn="ageFn"></ItemOneHeader>
        <h1>This is an dashboard page tIEMone</h1>
        <h2>{{ title }}</h2>
        {{ s }}
        <img :src="images" alt="这是一张图片">
        <!-- https://www.apple.com.cn/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/spatial-audio/medium.mp4 -->
        <video
            src="https://www.apple.com.cn/105/media/cn/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/pairing/medium.mp4#t=4.471418"
            controls></video>
        <ElButton>hello</ElButton>
    </div>
</template>
  
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>