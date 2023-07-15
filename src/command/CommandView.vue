<script lang="ts" setup>
import { 
    ref,
    getCurrentInstance, 
    ComponentInternalInstance, 
    ComponentPublicInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { $parentHost, $parentPort } = proxy as ComponentPublicInstance

const http = `http://${$parentHost}:${$parentPort}`

const cmdStr = ref('')

const serveStr = ref('')

const testFun = (): void => {
    fetch(http + '/cmd?cmd=' + 'yege').then(req => req.json()).then(res => {
        console.log('数据测试', res)
    })
}

const handleServeStr = (): void => {
    fetch(http + '/serve?serve=' + serveStr.value + '&cmd=' + cmdStr.value)
    .then(req => req.json()).then(res => {
        console.log('数据测试', res)
    })
}

</script>
<template>
    <div>
        <button @click="testFun">testFun</button>
        <ElInput v-model="cmdStr" placeholder="请输入命令" />
        <ElInput v-model="serveStr" placeholder="请输入地址" />
        <button @click="handleServeStr">{{ serveStr }}</button>
    </div>
</template>