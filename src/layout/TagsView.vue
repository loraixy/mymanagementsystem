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
                <li :key="item.name" @click="navigate"> {{ item.title }}</li>
            </RouterLink>
        </ul>
    </div>
</template>