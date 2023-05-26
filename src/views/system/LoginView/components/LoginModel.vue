<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

// 表单elemnt
const loginForm = ref<FormInstance | undefined>()
// 表单绑定的数据
const ruleForm = reactive({
    userName: '',
    password: ''
})
// 表单验证规则
const rule = reactive<FormRules>({
    userName: [
        {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 5,
            message: '请输入3-5个名称',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ]
})
// http://gxhis.net/api

// 点击登录
const clickLogin = async (loginForm: FormInstance | undefined): Promise<void> => {
    await loginForm?.validate((vali: boolean) => {
        if (vali) {
            // 一堆的判断是否可以登录请求数据等
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
    <ElForm ref="loginForm" :model="ruleForm" :rules="rule">
        <ElFormItem prop="userName">
            <span>User Name</span>
            <ElInput v-model="ruleForm.userName" placeholder="请输入账号"></ElInput>
        </ElFormItem>
        <ElFormItem prop="password">
            <span>User password</span>
            <ElInput v-model="ruleForm.password" placeholder="请输入密码"></ElInput>
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