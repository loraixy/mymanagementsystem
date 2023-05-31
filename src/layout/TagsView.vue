<script setup lang="ts">
import { useTagsStore } from '../stores/tags'

const sidebarStore = useTagsStore()

console.log(sidebarStore)

</script>

<template>
    <div>我是标签</div>
</template>