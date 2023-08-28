<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
</script>

<template>
    <h3 class=" w-full text-center text-2xl font-bold mb-3 ">个人用户登录</h3>
    <div class=" text-xl font-bold ">欢迎登录</div>

    <ElInput v-model="value" placeholder="请输入用户名" />
    <ElInput v-model="value" placeholder="请输入密码" />
    <div class=" flex ">
        <ElInput v-model="value" placeholder="请输入验证码" />
        <ElButton>
            <el-icon>
                <RefreshRight />
            </el-icon>
        </ElButton>
        <ElButton>
            <el-icon>
                <Comment />
            </el-icon>
        </ElButton>
    </div>
    <div><a href="#" style="text-decoration:underline; font-size: 13px;">忘记密码?</a></div>
    <div class=" w-full flex justify-around items-center ">
        <ElButton type="primary" size="large" style=" background-color: #0a71b4;">登录</ElButton>
        <span>注册</span>
    </div>
    <div>
        <ElDivider>快捷登录</ElDivider>
        <div class=" flex justify-between "> 
            <el-icon>
                <SwitchFilled />
            </el-icon>
            <el-icon>
                <ChromeFilled />
            </el-icon>
            <el-icon>
            <Eleme />
        </el-icon>
    </div>
</div></template>