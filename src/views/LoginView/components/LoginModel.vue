<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { FormInstance } from 'element-plus'

const router = useRouter()

// 用户名
const userName = ref('')
// 密码
const password = ref()

// 表单elemnt
const loginForm = ref<FormInstance | undefined>()

// 点击登录
const clickLogin = (loginForm: FormInstance | undefined): void => {
    loginForm?.validate((vali: boolean) => {
        console.log('是不是没执行')
        if (vali) {
            localStorage.setItem('lor', 'lor')
            router.push('/')
        } else {
            console.log('登录失败')
        }
    })
}
</script>

<template>
    <ElRow>
        <div class=" w-full text-center ">User Login</div>
    </ElRow>
    <ElForm ref="loginForm">
        <ElFormItem>
            <span>User Name</span>
            <ElInput v-model="userName" placeholder="请输入账号"></ElInput>
        </ElFormItem>
        <ElFormItem>
            <span>User password</span>
            <ElInput v-model="password" placeholder="请输入密码"></ElInput>
        </ElFormItem>
        <ElFormItem>
            <span>User Name</span>
            <ElInput placeholder="请输入内容"></ElInput>
        </ElFormItem>
        <ElFormItem>
            <ElButton type="danger" @click="clickLogin(loginForm)">login</ElButton>
        </ElFormItem>
    </ElForm>
</template>