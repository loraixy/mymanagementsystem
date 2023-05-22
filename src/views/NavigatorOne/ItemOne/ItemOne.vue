<script setup lang="ts">
import { ref } from 'vue'
const title = ref('')
const images = ref('')
fetch('https://apis.netstart.cn/zhihudaily/story/9741200').then(req => req.json()).then(res => {
    console.log('数据测试', res.story.image)
    title.value = res.story.title
    images.value = res.story.image
})
</script>

<template>
    <div class="dashboard">
        <h1>This is an dashboard page tIEMone</h1>
        <h2>{{ title }}</h2>
        <img :src="images" alt="这是一张图片">
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