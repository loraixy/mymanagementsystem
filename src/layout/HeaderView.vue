<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useSideBarStore } from '../stores/sidebar'
import { useTagsStore } from '../stores/tags'

import TagsView from './TagsView.vue'

const router = useRouter()

const store = useSideBarStore()

const tagsStore = useTagsStore()

// 退出登录
const handleCommand = (command: string) => {

    if (command === 'loginOut') {
        localStorage.removeItem('lor')
        localStorage.removeItem('local_tags_list')
        tagsStore.tagsList = []
        router.push('/login')
    }
}
</script>

<template>
    <div class=" flex header h-12 w-full border-b border-slate-200">
        <div class=" flex items-center h-full cursor-pointer select-none " @click="store.handleIsCollapse">
            <div class=" flex justify-center items-center w-16 h-full bg-gray-100">
                <ElIcon :size="20">
                    <IEpMenu />
                </ElIcon>
            </div>
            <Transition name="header-logo-move">
                <div class=" flex-1 flex items-center w-[9.13rem]  h-full text-base bg-gray-100" v-show="!store.isCollapse">
                    Lor 后台管理系统
                </div>
            </Transition>
        </div>
        <!-- 这里是展示那些标签，切换小标签的 -->
        <div class=" flex-1 " style="flex-basis: auto;">
            <TagsView />
        </div>
        <div class=" flex items-center pr-5 ">
            <ElBadge :value="3" :max="99" class=" mt-2 mr-2 ">
                <ElIcon :size="20">
                    <IEpMessage />
                </ElIcon>
            </ElBadge>
            <a target="_blank" href="https://loraixy.github.io">
                <ElIcon :size="20" class=" mr-2 " @click="">
                    <IEpHouse />
                </ElIcon>
            </a>
            工具栏

            <ElDropdown :hide-on-click="false" trigger="click" @command="handleCommand">
                <span>{{ '用户' }}</span>
                <template #dropdown>
                    <ElDropdownMenu>
                        <ElDropdownItem command="loginOut">
                            <div>
                                退出
                            </div>
                        </ElDropdownItem>
                        <ElDropdownItem>
                            修改密码
                        </ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
        </div>
    </div>
</template>

<style lang="scss">
.header-logo-move-leave-from,
.header-logo-move-enter-to {
    // flex: 1;
    width: 9.13rem;
    white-space: nowrap;
    overflow: hidden;
}

.header-logo-move-leave-active,
.header-logo-move-enter-active {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.header-logo-move-leave-to,
.header-logo-move-enter-from {
    // flex: 0;
    width: 0;
    white-space: nowrap;
    overflow: hidden;
}
</style>