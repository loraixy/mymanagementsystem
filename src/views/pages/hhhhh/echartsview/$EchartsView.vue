<script lang="ts" setup name="Navigatorhhhhh-echartsview" >
import { ref } from 'vue'
console.log('我是echarts');

const num1 = ref(0);

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


downloadHTML();
</script>

<template>
    <div>
        我是echarts

        <div>{{ num1 }}</div>
    </div>
</template>