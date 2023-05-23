<script setup lang="ts">
import { onUnmounted } from 'vue'
import { RouterView } from 'vue-router';
import { userSideBarStore } from '../stores/sidebar'

import HeaderView from '../layout/HeaderView.vue'
import SideBarView from '../layout/SideBarView.vue'
import TagsView from '../layout/TagsView.vue'

const userStore = userSideBarStore()
// 监听浏览器mq的改变应该是
userStore.mq.addEventListener('change', userStore.handleResize)

userStore.handleResize()

onUnmounted(() => {
  userStore.mq.removeEventListener('change', userStore.handleResize)
})
</script>

<template>
  <div class="common-layout h-full">
    <ElContainer class=" h-full ">
      <ElHeader height="48px">
        <HeaderView />
      </ElHeader>
      <ElContainer>
        <ElAside width="auto" style="background-color: var(--lor-blue);">
          <SideBarView />
        </ElAside>

        <ElMain>
          <TagsView />
          <div>
            <RouterView></RouterView>
          </div>
        </ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<style lang="scss">
.content-main {
  display: flex;
}

.el-header {
  padding: 0;
}

.move-enter-active,
.move-leave-active {
  transition: opacity .1s ease;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>
