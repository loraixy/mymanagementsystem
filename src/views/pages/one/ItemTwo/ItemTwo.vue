<script setup lang="ts">
import { ref, onMounted } from 'vue'

const bodyData = ref('')

fetch('https://apis.netstart.cn/zhihudaily/story/9741200').then(req => req.json()).then(res => {
    // console.log('数据测试', res.story.body)
    bodyData.value = res.story.body
})

const timeoutFunc = (id: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('id =>', id);
            resolve("success" + id);

        }, 2000)
    })
}

/**
* 生成一个异步函数，用于在数组上执行异步操作。
* @param {Function} asyncFunc - 在数组中的每个项上要调用的异步函数。
* @returns {Function} - 执行异步操作的柯里化函数。
*/
const curryingAndClosureAndCallback = (asyncFunc: (...args: any[]) => Promise<any>) => {
    let current = 0;
    let time = new Date().getTime();
    let total = 0; // 计数器，用于记录异步操作的数量
    let isCompleted = false; // 标志，用于记录是否全部完成

    const func = <T>(arr: Array<T>): Promise<any> => {
        if (arr.length === 0) return Promise.resolve(isCompleted);
        const item = arr.shift();
        current = current + 1;
        total++; // 增加计数器
        return asyncFunc(item)
            .then(() => {
                current--;
                console.log(new Date().getTime() - time);
                total--; // 异步操作完成，减少计数器

                if (total === 0) {
                    isCompleted = true; // 所有异步操作都完成了
                }

                return func(arr);
            })
            .catch(error => {
                current--;
                total--; // 异步操作完成，减少计数器
                console.error(error);
                return Promise.reject(error);
            });
    };
    return func;
};

onMounted(() => {
    const func = curryingAndClosureAndCallback(timeoutFunc);

    func(['1', '2', '3', "q"])
        .then(res => {
            console.log("是否全部完成 =>", res)
        })
        .catch(err => {
            console.log(err)
        })
    console.log('onMounted')
})

</script>

<template>
    <div class=" bg-white dashboard rounded-md p-2 ">
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