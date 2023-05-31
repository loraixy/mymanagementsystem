<script setup lang="ts">
import { onUnmounted } from 'vue'
import { RouterView } from 'vue-router';
import { useSideBarStore } from '../../stores/sidebar'

import HeaderView from '../../layout/HeaderView.vue'
import SideBarView from '../../layout/SideBarView.vue'

const userStore = useSideBarStore()
// 监听浏览器mq的改变应该是
userStore.mq.addEventListener('change', userStore.handleResize)
// 改变大小
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
          <div>
            <!-- 上面这个写法没有bug，下面的有很奇怪 -->
            <!-- <Transition name="move">
              <RouterView></RouterView>
            </Transition> -->
            <!-- https://blog.csdn.net/weixin_57677300/article/details/128385003 这里是解决方法 -->
            <RouterView v-slot="{ Component }">
              <Transition name="move" mode="out-in" appear>
                <KeepAlive>
                  <Component :is="Component" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </div>
        </ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<style lang="scss">
.el-main {
  height: calc(100vh - 3rem);
}

.content-main {
  display: flex;
}

.el-header {
  padding: 0;
}

.move-enter-to,
.move-leave-from {
  opacity: 1;
}

.move-enter-active,
.move-leave-active {
  transition: opacity .3s ease;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>
