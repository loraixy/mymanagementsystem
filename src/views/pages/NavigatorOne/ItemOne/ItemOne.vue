<script setup lang="ts">
import { ref } from 'vue'

import ItemOneHeader from './components/ItemOneHeader.vue';
const title = ref('')
const images = ref('')
const age = ref(12)

fetch('https://apis.netstart.cn/zhihudaily/story/9741200').then(req => req.json()).then(res => {
    console.log('数据测试', res.story.image)
    title.value = res.story.title
    images.value = res.story.image
})

const ageFn = (val: number): void => {
    age.value = val
}

</script>

<template>
    <div class="item-one overflow-y-auto ">
        <ItemOneHeader :age="age" @age-fn="ageFn"></ItemOneHeader>
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