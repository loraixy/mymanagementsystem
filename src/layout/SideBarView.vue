<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useSideBarStore } from '../stores/sidebar'
import { storeToRefs } from 'pinia'

const route = useRoute()

const store = useSideBarStore()

const { isCollapse } = storeToRefs(store)

// const menus = ref([])

const defaultActivePath = computed(() => {
    return route.path.substring(1, route.path.length)
})

</script>

<template>
    <!-- defaultActive 在设置router="true" 的时候自动根据当前路由路径来显示高亮 -->
    <ElMenu class=" max-w-[13.125rem] " :collapse="isCollapse" :default-active="defaultActivePath" router>
        <ElSubMenu index="1">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <IEpLocation />
                </ElIcon>
                <span class=" overflow-hidden whitespace-nowrap text-ellipsis ">Navigator hhhhhhhhhhhhhhh</span>
            </template>
            <ElMenuItem index="virtual-list">虚拟列表</ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="2">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <IEpLocation />
                </ElIcon>
                <span>Navigator One</span>
            </template>
            <ElMenuItem index="item-one">item one</ElMenuItem>
            <ElMenuItem index="item-two">item two</ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="3">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <IEpCirclePlusFilled />
                </ElIcon>
                <span>Navigator One two</span>
            </template>
            <ElMenuItemGroup p title="Group One">
                <ElMenuItem index="group-one">树形数据</ElMenuItem>
                <ElMenuItem disabled index="home">item two</ElMenuItem>
            </ElMenuItemGroup>
        </ElSubMenu>
        <!-- <ElSubMenu v-for="(item) in menus" :key="item.path" :index="item.id">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <IEpCirclePlusFilled />
                </ElIcon>
                <span>{{ item.title }}</span>
            </template>
            <ElMenuItem index="item-one" v-for="menuItem in item.menu" :key="menuItem.path">
                {{ menuItem.title }}
            </ElMenuItem>
        </ElSubMenu> -->
    </ElMenu>
</template>

<style lang="scss">
.el-menu {
    --el-menu-bg-color: var(--lor-blue);
    --el-menu-border-color: var(--lor-blue);
    --el-menu-text-color: #fff;
    --el-menu-hover-bg-color: var(--lor-sidebar-hover-bg);
}
</style>