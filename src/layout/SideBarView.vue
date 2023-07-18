<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useSideBarStore } from '../stores/sidebar'
import { storeToRefs } from 'pinia'

import type { IMenu } from '../typings/system'

const route = useRoute()

const store = useSideBarStore()

const { isCollapse } = storeToRefs(store)

const props = defineProps<{
    menuList: IMenu[]
}>()

const defaultMenu = computed(() => {

    return props.menuList.map(item => ({
        title: item.title,
        index: item.id,
        icon: item.ico,
        parent: item.parent,
        url: item.ulr
    }))
})

const menus = computed(() => {
    return defaultMenu.value.filter(item => item.parent === -999).map(item => ({
        title: item.title,
        index: item.index.toString(),
        icon: item.icon,
        menuItems: props.menuList.filter(subItem => subItem.parent !== -999 && subItem.parent === item.index).map(mapItem => ({
            title: mapItem.title,
            index: mapItem.ulr,
            icon: mapItem.ico,
            url: mapItem.ulr
        })),
    }))
})

const defaultActivePath = computed(() => {
    return route.path.substring(1, route.path.length)
})

</script>

<template>
    <!-- defaultActive 在设置router="true" 的时候自动根据当前路由路径来显示高亮 -->
    <ElMenu class=" max-w-[13.125rem] w-[13.125rem] " :collapse="isCollapse" :default-active="defaultActivePath"
        unique-opened router>
        <ElSubMenu index="1">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <Location />
                </ElIcon>
                <span class=" overflow-hidden whitespace-nowrap text-ellipsis ">Navigator hhhhhhhhhhhhhhh</span>
            </template>
            <ElMenuItem index="/virtual-list">虚拟列表</ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="2">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <Location />
                </ElIcon>
                <span>Navigator One</span>
            </template>
            <ElMenuItem index="/pages/NavigatorOne/ItemOne">item one</ElMenuItem>
            <ElMenuItem index="/pages/NavigatorOne/ItemTwo">item two</ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="3">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <CirclePlusFilled />
                </ElIcon>
                <span>Navigator One two</span>
            </template>
            <ElMenuItemGroup title="Group One">
                <ElMenuItem index="/group-one">树形数据</ElMenuItem>
                <ElMenuItem disabled index="home">item two</ElMenuItem>
            </ElMenuItemGroup>
        </ElSubMenu>
        <ElSubMenu v-for="(item) in menus" :key="item.title" :index="item.index">
            <template #title>
                <ElIcon :size="20" color="#409EFC">
                    <component :is="`${item.icon}`" />
                </ElIcon>
                <span>{{ item.title }}</span>
            </template>
            <ElMenuItem :index="menuItem.index" v-for="menuItem in item.menuItems">
                {{ menuItem.title }}
            </ElMenuItem>
        </ElSubMenu>
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