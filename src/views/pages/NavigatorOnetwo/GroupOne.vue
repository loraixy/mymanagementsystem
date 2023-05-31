<script setup lang="ts">
import { ref } from 'vue'
const treeData = ref<any[]>([])

console.log(0.5 - 0.2, 0.3)

fetch('treeData.json').then(req => req.json()).then(res => {
    treeData.value = res.data[0]

    console.log('treeData =>', treeData.value)
    // 调用函数

    // 调用函数，添加新字段
    addGourpNumToSqdMxList(treeData.value, 'groupNum');
    console.log(treeData.value);

})

// fetch('https://jxakyysmis.top/api/Myfromwork/login?username=admin&password=Admin_123&JigID=').then(req => req.json()).then(res => {
//     console.log(res)
// })

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

// // 示例数据
// const treeData = [
//     {
//         id: 1, name: 'Node 1', children: [
//             {
//                 id: 2, name: 'Node 2', children: [
//                     {
//                         id: 3, name: 'Node 3', children: [
//                             { id: 4, name: 'Node 4', children: [], SqdMxList: '1' }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ];
</script>

<template>
    <div>树形数据修改</div>
</template>