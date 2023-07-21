<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import type {
    ComponentInternalInstance,
    ComponentPublicInstance
} from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { $parentHost, $parentPort } = proxy as ComponentPublicInstance

const http = `http://${$parentHost}:${$parentPort}`

const currentHttp = import.meta.env.VITE_API_BASE_URL

const cmdStr = ref('')

const serveStr = ref(currentHttp)

const testFun = (cmd: string): void => {
    fetch(`${http}/cmd?cmd=${cmd}&serve=${serveStr.value}`).then(req => req.json()).then(res => {
        console.log('数据测试', res)
    })
}

</script>
<template>
    <div>
        <button @click="testFun('yege')">testFun</button>
        <ElInput v-model="cmdStr" placeholder="请输入命令" />
        <ElInput v-model="serveStr" placeholder="请输入地址" />
        <ElButton type="primary" @click="testFun('custom')">自定义</ElButton>
        <button>{{ serveStr }}</button>
    </div>
</template>