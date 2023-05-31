<script setup lang="ts">

import { useTagsStore } from '../stores/tags'
import { storeToRefs } from 'pinia'

import { RouterLink } from 'vue-router'

const sidebarStore = useTagsStore()

const { tagsList } = storeToRefs(sidebarStore)

console.log(sidebarStore.tagsList)

</script>

<template>
    <div class=" h-full ">
        <ul class=" flex items-center h-full">
            <RouterLink :to="item.path" v-for=" item in tagsList" custom v-slot="{ navigate }">
                <li :key="item.name" @click="navigate" @mouseenter="item.closeBoldIconShow = true"
                    @mouseleave="item.closeBoldIconShow = false">
                    <div class=" flex justify-between items-center w-24 p-1 cursor-pointer select-none">
                        <span>{{ item.title }}</span>
                        <ElIcon :size="12" v-show="item.closeBoldIconShow">
                            <IEpCloseBold />
                        </ElIcon>
                    </div>
                </li>
            </RouterLink>
        </ul>
    </div>
</template>