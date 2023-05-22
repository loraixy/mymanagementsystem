<script lang="ts" setup>

</script>

<template>
    <div>
        <div>
            <div class=" flex h-screen relative ">
                <div class=" flex-1 h-full bg-white "></div>
                <div class=" flex-1 h-full bg-[#1c3b67] ">这里是登录页面</div>
                <div class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 shadow-lg bg-white ">
                    <main class=" flex h-full bg-white text-slate-200 ">
                        <div class=" flex-1 ">
                            <ElInput placeholder="请输入账号"></ElInput>
                            <ElInput placeholder="请输入密码"></ElInput>
                            <ElInput placeholder="请输入内容"></ElInput>

                        </div>
                        <div class=" flex-1 h-full bg-[#1c3b67]">
                            登录模块
                            <span class=" drop-shadow ">UserLogin</span>
                            欢迎登录， Lor 后台管理系统
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>