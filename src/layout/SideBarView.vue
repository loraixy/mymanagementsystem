<script setup lang="ts">
import { userSideBarStore } from '../stores/sidebar'
import { storeToRefs } from 'pinia'


const store = userSideBarStore()

const { isCollapse } = storeToRefs(store)



</script>

<template>
    <ElMenu class=" max-w-[13.125rem] " :collapse="isCollapse" router>
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
                <ElMenuItem index="group-one">Group one</ElMenuItem>
                <ElMenuItem disabled index="home">item two</ElMenuItem>
            </ElMenuItemGroup>
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