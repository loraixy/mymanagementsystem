<script setup lang="ts">
import { watch } from 'vue'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
console.log(route)

watch(() => route.fullPath, (val) => {
  console.log(val)
})


</script>

<template>
  <!-- :locale="zhCn" -->
  <!-- <ElConfigProvider> -->
  <RouterView v-slot="{ Component }">
    <Transition name="move" mode="out-in" appear>
      <Component :is="Component" />
    </Transition>
  </RouterView>
  <!-- </ElConfigProvider> -->
</template>

<style scoped>
/* #app { */
/* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  position: absolute; */
/* } */

.move-enter-to,
.move-leave-from {
  opacity: 1;
}

.move-enter-active,
.move-leave-active {
  transition: opacity .2s ease;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>
