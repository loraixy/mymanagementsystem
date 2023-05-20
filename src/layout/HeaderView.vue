<script setup lang="ts">
import { userSideBarStore } from '../stores/sidebar'

const store = userSideBarStore()
</script>

<template>
    <div class=" flex justify-between header h-12 w-full border-b border-slate-200">
        <div class=" flex items-center min-[480px]:w-[13.131rem] h-full cursor-pointer select-none "
            @click="store.handleIsCollapse">
            <div class=" flex justify-center items-center w-16 h-full bg-gray-100">
                <ElIcon :size="20">
                    <IEpMenu />
                </ElIcon>
            </div>
            <Transition name="header-logo-move">
                <div class=" flex-1 flex items-center  h-full text-base bg-gray-100" v-show="!store.isCollapse">
                    Lor 后台管理系统
                </div>
            </Transition>
        </div>
        <div>
            最顶部的工具栏
            退出
        </div>
    </div>
</template>

<style lang="scss">
.header-logo-move-leave-from,
.header-logo-move-enter-to {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
}

.header-logo-move-leave-active,
.header-logo-move-enter-active {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.header-logo-move-leave-to,
.header-logo-move-enter-from {
    flex: 0;
    white-space: nowrap;
    overflow: hidden;
}
</style>