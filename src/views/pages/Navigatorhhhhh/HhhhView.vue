<script setup lang="ts">
import { ref } from 'vue'

const hospitalList = ref([])

fetch('../../../../医院报表.json').then(req => req.json()).then(res => {
    hospitalList.value = res.data[0]
    console.log("hospitalList =>", hospitalList.value)
})
</script>

<template>
    <div>我哈哈哈哈哈哈
        <ElTable :data="hospitalList">
            <ElTableColumn prop="XINGM" label="姓名" ></ElTableColumn>
        </ElTable>
    </div>
</template>