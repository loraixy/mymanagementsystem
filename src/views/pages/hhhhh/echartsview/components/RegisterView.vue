<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
</script>

<template>
    <h3 class=" w-full text-center text-2xl font-bold mb-3 ">欢迎注册</h3>

    <ElInput v-model="value" placeholder="请输入用户名" />
    <ElInput v-model="value" placeholder="请输入密码" />
    <ElInput v-model="value" placeholder="请输入用户名" />
    <ElInput v-model="value" placeholder="请输入密码" />
    <ElInput v-model="value" placeholder="请输入用户名" />
    <div class=" flex justify-between ">
        <ElInput v-model="value" placeholder="请输入验证码" />
        <ElButton type="primary" style=" margin-left: 10px; background-color: #0a71b4;">获取验证码</ElButton>
    </div>

    <ElButton type="primary" size="large" style=" background-color: #0a71b4;">注册</ElButton>
</template>