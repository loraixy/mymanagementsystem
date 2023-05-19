<script setup lang="ts">
fetch('https://apis.netstart.cn/zhihudaily/story/9741200').then(req => req.json()).then(res => {
    console.log('数据测试',res)
})
</script>

<template>
    <div class="dashboard">
        <h1>This is an dashboard page tIEMone</h1>
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