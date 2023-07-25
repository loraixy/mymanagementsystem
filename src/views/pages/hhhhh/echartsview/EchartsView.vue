<script lang="ts" setup name="Navigatorhhhhh-echartsview" >
import { ref } from 'vue'
console.log('我是echarts');

const num1 = ref(0);

/**
 * ! 不正确
 * ? 功能是否合理
 * 
 * TODO: 后续需要优化
 * @param {number} num
 */
const downloadHTML = () => {
    const data = "<html><body><h1>Hello, World!</h1></body></html>"; // 替换为您要转换为HTML的数据

    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.html'; // 设置下载文件的文件名
    link.click();

    URL.revokeObjectURL(url);
}



</script>

<template>
    <div>
        我是echarts
        <h3 class="test">我是echarts</h3>
        <div class=" hidden ">{{ num1 }}</div>
        <div @click="downloadHTML"></div>
    </div>
</template>


<style>
.test {
    background-color: red;
}
</style>