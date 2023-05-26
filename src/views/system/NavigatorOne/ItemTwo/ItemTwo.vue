<script setup lang="ts">
import { ref } from 'vue'

const bodyData = ref('')

fetch('https://apis.netstart.cn/zhihudaily/story/9741200').then(req => req.json()).then(res => {
    console.log('数据测试', res.story.body)
    bodyData.value = res.story.body

})
</script>

<template>
    <div class="dashboard">
        <h1>This is an itemTwo page ITEMtWO</h1>
        <div v-html="bodyData"></div>
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