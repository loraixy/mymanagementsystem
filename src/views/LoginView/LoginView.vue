<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const showLoginModel = ref(false)

onMounted(() => {
    showLoginModel.value = true
})

import LoginModel from './components/LoginModel.vue'

</script>

<template>
    <div>
        <div>
            <div class=" flex h-screen relative ">
                <div class=" flex-1 h-full bg-white "></div>
                <div class=" flex-1 h-full bg-[--lor-blue] ">这里是登录页面</div>
                <Transition name="card">
                    <div class=" login-card " v-show="showLoginModel">
                        <main class=" flex h-full  rounded-sm bg-white text-slate-200 ">
                            <div class=" flex-1 flex flex-col justify-center items-center bg-gray-100 ">
                                <el-row class="mb-4">
                                    <el-button>Default</el-button>
                                    <el-button type="primary">Primary</el-button>
                                    <el-button type="success">Success</el-button>
                                    <el-button type="info">Info</el-button>
                                    <el-button type="warning">Warning</el-button>
                                    <el-button type="danger">Danger</el-button>
                                </el-row>
                                <div class=" w-[18.75rem] p-7 rounded-sm text-gray-400 bg-white ">
                                    <!-- 登录表单组件 -->
                                    <LoginModel></LoginModel>
                                </div>
                            </div>
                            <div class=" flex-1 h-full bg-[--lor-blue]">
                                登录模块
                                <span class=" drop-shadow ">UserLogin</span>
                                欢迎登录， Lor 后台管理系统
                            </div>
                        </main>

                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style>
.login-card {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 shadow-lg rounded-sm bg-white
}

.card-enter-from {
    left: 50%;
    opacity: 0;
    transform: translateY(15%) translateX(-50%);
}

.card-enter-active {
    transition: all 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card-enter-to {
    left: 50%;
    opacity: 1;
    transform: translateY(-50%) translateX(-50%);
}
</style>