<script setup lang="ts" >
import { ref, computed, onMounted } from 'vue'
// 医院报表数据类型接口
import type { IHospitalList } from '../../../typings/hhhh'

// 医院报表数据
const hospitalList = ref<IHospitalList[]>([])

// table最大的div
const elTable = ref<HTMLElement | undefined>()
// 列表每一项的高度
const itemSize = ref(40)
// 可视固定高度
const screenHeight = ref(itemSize.value * 10)
// 列表的偏移位置
const startOffset = ref(0)
// 数据起始索引
const startIndex = ref(0)
// 数据结束索引
const endIndex = ref(0)
// 列表展示
const listShow = ref(true)
// 表格的总高
const elTableHeight = computed<number>(() => {
    return hospitalList.value.length * itemSize.value
})
// 可显示的列表数
const visibleCount = computed<number>(() => {
    return Math.ceil(screenHeight.value / itemSize.value)
})
// 可显示的列表数据
const visibleData = computed(() => {
    return hospitalList.value.slice(startIndex.value, endIndex.value)
})
// 元素的偏移
const elTableTransform = computed<string>(() => {
    return `translate3d(0,${startOffset.value}px,0)`
})

console.log('elTableTransform =>', elTableTransform)

interface ITest {
    type: string
    getType: () => void
}

const test = {
    type: 'sdf',
    getType: function (this: ITest) {

        return () => {

            return this.type
        }
    }
}

// addEventListener()


const getData = () => {
    fetch('hospitalList.json').then(req => req.json()).then(res => {
        hospitalList.value = res.data[0]
        console.log("hospitalList =>", hospitalList.value, hospitalList, test)
    })
}
let suits = ["hearts", "spades", "clubs", "diamonds"];

// ts中方法的重载 数据的不确定性，有写时候返回不同的值

function pickCard(x: number): { suit: string; card: number; }
function pickCard(x: { suit: string; card: number; }[]): number
function pickCard(x: any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length)
        return pickedCard
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 }
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit)

let pickedCard2 = pickCard(15)
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit)

getData()

endIndex.value = visibleCount.value + startIndex.value
// 处理滚动监听
const handleTableScroll = (event: UIEvent): void => {

    const target: HTMLElement | null = event.target instanceof HTMLElement ? event.target : null
    // console.log(target?.scrollTop)
    const scrollTop = target?.scrollTop as number
    // 给startIndex进行赋值
    startIndex.value = Math.floor(scrollTop / itemSize.value)
    // 这是结尾的
    endIndex.value = visibleCount.value + startIndex.value
    // 这是表格的偏移量
    startOffset.value = scrollTop - (scrollTop % itemSize.value)
    // console.log('startIndex, endIndex =>', startIndex.value, endIndex.value)
}

onMounted(() => {

})

</script>

<template>
    <div>
        <ElButton @click="listShow = true">使用长列表</ElButton>
        <ElButton @click="listShow = false">没有使用</ElButton>
        <h2>未作处理的表格， 是明显可以感受到卡顿的，开始渲染时间长且侧边栏也会卡顿 , 当前列表项数量：{{ hospitalList.length }}</h2>
        <!-- 解决数据渲染7000 条 最近工作需要旧的的项目是vue2的这边也自己写一下 -->
        <div v-if="listShow">
            <div>当前为已经使用 (简易的虚拟列表)</div>
            <div ref="elTable" class=" relative " :style="`height:${screenHeight}px; overflow: auto;`"
                @scroll="handleTableScroll">
                <div :style="`height: ${elTableHeight}px; `"></div>
                <div class=" absolute z-50 left-0 top-0 right-0 " :style="{ transform: elTableTransform }">
                    <ElTable :data="visibleData">
                        <ElTableColumn prop="XINGM" label="姓名" key="XINGM"></ElTableColumn>
                        <ElTableColumn prop="JZKS" label="科室" key="JZKS"></ElTableColumn>
                    </ElTable>
                </div>
            </div>
        </div>
        <div v-else>
            <div>当前为未使用</div>
            <div class=" h-96 overflow-auto">
                <ElTable :data="hospitalList">
                    <ElTableColumn prop="XINGM" label="姓名" key="XINGM"></ElTableColumn>
                    <ElTableColumn prop="JZKS" label="科室" key="JZKS"></ElTableColumn>
                </ElTable>
            </div>
        </div>
    </div>
</template>

