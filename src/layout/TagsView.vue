<script setup lang="ts">

import { useTagsStore } from '../stores/tags'
import { storeToRefs } from 'pinia'

import { RouterLink } from 'vue-router'

const tagsStore = useTagsStore()

const { tagsList, currentPath } = storeToRefs(tagsStore)

console.log(tagsStore.tagsList)

</script>

<template>
    <div class=" h-full ">
        <!-- 路由标签组 -->
        <ul class=" flex items-center h-full">
            <RouterLink :to="item.path" v-for=" item in tagsList" custom v-slot="{ navigate }">
                <li :key="item.name" :class="{ 'bg-[--lor-active-bg-color]': item.path === currentPath }" @click="navigate"
                    @mouseenter="item.closeBoldIconShow = true" @mouseleave="item.closeBoldIconShow = false">
                    <div class=" flex justify-between items-center w-24 mx-1 cursor-pointer select-none">
                        <span class=" leading-[47px]">{{ item.title }}</span>
                        <span class=" flex items-center hover:bg-gray-400 rounded p-1 ">
                            <ElIcon :size="12" v-show="item.closeBoldIconShow || item.path === currentPath">
                                <IEpCloseBold />
                            </ElIcon>
                        </span>
                    </div>
                </li>
            </RouterLink>
        </ul>
    </div>
</template>