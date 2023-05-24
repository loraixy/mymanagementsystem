<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    age: number
}>()

const emit = defineEmits<{
    (evt: 'ageFn', num: number): void
}>()

const value = ref('hhh')

const setEmitAge = () => {
    let num: number = props.age
    num++
    emit('ageFn', num)
}

</script>

<template>
    <div>
        我是该头部标签 {{ value }}
        <ElButton @click="setEmitAge">{{ age }}</ElButton>
    </div>
</template>