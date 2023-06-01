<script setup lang="ts">
import { ref, computed } from 'vue'
// 树形数据
const treeData = ref<any[]>([])
// 数1
const num1 = ref(0)
// 数2
const num2 = ref(1)
// 减法的最终运算结果
const resultNum = computed<number>((): number => {
    const decimalPlaces1 = countDecimalPlaces(num1.value)

    const decimalPlaces2 = countDecimalPlaces(num2.value)
    // 判断哪一个小数更多，然后就用次方转化的整数大一点，不然就不能统一都是整数了，
    // 出现这种 20.13 与 20.156 相同的就会变成 2013 2015.6 有浮点数的出现还是容易造成精度丢失
    let resultPlaces: number = 0

    decimalPlaces1 > decimalPlaces2 ? resultPlaces = decimalPlaces1 : resultPlaces = decimalPlaces2

    return (num1.value * (10 ** resultPlaces) - num2.value * (10 ** resultPlaces)) / (10 ** resultPlaces)
})
// 乘法
const multiplicationNun = computed(() => {
    return num1.value * num2.value
})

// 判断几位小数
const countDecimalPlaces = (num: number | string): number => {
    // 判断是否有.没有的话就直接返回0， 就是没有小数
    let decimaIndex: number = num.toString().indexOf('.')

    if (decimaIndex === -1) return 0
    // 这边直接在.的位置到末尾的字符串，然后返回该字符串长度就能得到该小数有几位了
    return num.toString().substring(decimaIndex + 1, num.toString().length).length
}
// 获取数据
fetch('treeData.json').then(req => req.json()).then(res => {
    treeData.value = res.data[0]

    console.log('treeData =>', treeData.value)
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
            <p>这里是js经典的精度问题</p>
            <ElInput type="text" v-model="num1" />
            <ElInput type="text" v-model="num2" />
            <p>使用先将小数转换整数后再转换回来(只能解决固定返回的小数)
                <Transition name="num-move">
                    <span>
                        {{ resultNum }}
                    </span>
                </Transition>
            </p>
            <p>{{ multiplicationNun }}</p>

        </div>
    </div>
</template>

<style lang="scss">
.num-move-enter-form {
    transform: scaleZ(2)
}

.num-move-enter-active {
    transition: all .5s linear;
}

.num-move-enter-to {
    transform: scaleZ(1)
}
</style>