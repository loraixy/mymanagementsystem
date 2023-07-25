<script setup lang="ts">
import { ref, toRaw } from 'vue'

import ItemOneHeader from './components/ItemOneHeader.vue';

import {menu} from '@/apis/MenuManagement'
const title = ref('')
const images = ref('')
const age = ref(12)

const ageFn = (val: number): void => {
    age.value = val
}
// https://apis.netstart.cn/zhihudaily/stories/latest

const runningWater = () => {
    // 向后端发送异步请求
fetch('https://apis.netstart.cn/zhihudaily/stories/latest', {
  method: 'GET',
})
  .then((response) => {
    const reader = response.body?.getReader();

    // 监听数据的到达事件
    function read() {
      reader?.read().then(({ done, value }) => {
        if (done) {
          // 请求结束，关闭连接或执行其他操作
          return;
        }

        // 处理接收到的数据，例如将文本显示在页面上
        const text = new TextDecoder().decode(value);
        console.log(text);

        // 继续读取下一块数据
        read();
      });
    }

    // 开始读取数据
    read();
  })
  .catch((error) => {
    console.error('请求错误:', error);
  });
}

runningWater()

const getMenuRunningWater = async () => {
     const res = await menu.getRunningWater()

     console.log(res)
}

getMenuRunningWater()

const testData = ref('nihao')

const s = toRaw(testData)

</script>

<template>
    <div class="item-one overflow-y-auto ">
        <ItemOneHeader :age="age" @age-fn="ageFn"></ItemOneHeader>
        <h1>This is an dashboard page tIEM one</h1>
        <h2>{{ title }}</h2>
        {{ s }}
        <img :src="images" alt="这是一张图片">
        <!-- https://bucket-bnq-app.oss-cn-hangzhou.aliyuncs.com/emallmgr/content/cases/1557711192811.jpg -->
        <!-- https://bucket-bnq-app.oss-cn-hangzhou.aliyuncs.com/emallmgr/content/cases/1557711192811.jpg?x-oss-process=image/format,webp -->
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