<script setup lang="ts">
import { ref, computed } from 'vue'
// 树形数据
const treeData = ref<any[]>([])

const num1 = ref(0)

const num2 = ref(1)

const resultNum = computed(() => {
    return (num1.value * 100 - num2.value * 100) / 100
})

const multiplicationNun = computed(() => {
    return num1.value * num2.value
})

fetch('treeData.json').then(req => req.json()).then(res => {
    treeData.value = res.data[0]

    console.log('treeData =>', treeData.value)
    // 调用函数

    // 调用函数，添加新字段
    addGourpNumToSqdMxList(treeData.value, 'groupNum');
    console.log(treeData.value);

})

// 递归函数
function addGourpNumToSqdMxList(treeData: any, gourpNumField: any) {
    for (let i = 0; i < treeData.length; i++) {
        for (const key in treeData[i]) {
            const current = treeData[i][key];
            if (Array.isArray(current)) {
                // 递归调用
                addGourpNumToSqdMxList(current, gourpNumField);
            } else if (treeData[i].SqdMxList) {
                // 添加新字段
                treeData[i].SqdMxList = treeData[i].SqdMxList.map((item: any, index: any) => ({
                    ...item,
                    [gourpNumField]: index + 1
                }))
            }
        }
    }
}

// 性能优化版

</script>

<template>
    <div>树形数据修改
        <div>
            <ElInput type="text" v-model="num1" />
            <ElInput type="text" v-model="num2" />
            <p>使用先将小数转换整数后再转换回来(只能解决固定返回的小数){{ resultNum }}</p>
            <p>{{ multiplicationNun }}</p>
            <p>这里是js经典的精度问题</p>
        </div>
    </div>
</template>