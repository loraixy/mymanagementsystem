<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LoginModel from './components/LoginModel.vue'

const showLoginModel = ref(false)

onMounted(() => {
    showLoginModel.value = true
})

</script>

<template>
    <div class=" flex h-screen relative ">
        <div class=" flex-1 h-full bg-white "></div>
        <div class=" flex-1 h-full bg-[--lor-blue] "></div>
        <Transition name="card">
            <div class=" login-card " v-show="showLoginModel">
                <main class=" flex h-full  rounded-sm bg-white text-slate-200 ">
                    <div
                        class=" flex flex-col justify-center items-center w-1/2 bg-gray-100 max-md:w-full transition-all  ">
                        <div class=" w-[18.75rem] p-7 rounded-sm text-gray-400 bg-white ">
                            <!-- 登录表单组件 -->
                            <LoginModel></LoginModel>
                        </div>
                    </div>
                    <div class=" h-full w-1/2 bg-[--lor-blue] max-md:hidden ">
                        登录模块
                        <span class=" drop-shadow ">UserLogin</span>
                        欢迎登录， Lor 后台管理系统1
                    </div>
                </main>

            </div>
        </Transition>
    </div>
</template>

<style>
.login-card {
    /* 这个爆黄在.vscode 加上settings.json文件配置可以解决 */
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 shadow-lg rounded-sm bg-white
}

.card-enter-from {
    left: 50%;
    opacity: 0;
    transform: translateY(15%) translateX(-50%);
}

.card-enter-active {
    transition: all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card-enter-to {
    left: 50%;
    opacity: 1;
    transform: translateY(-50%) translateX(-50%);
}
</style>