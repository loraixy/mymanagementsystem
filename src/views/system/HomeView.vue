<script setup lang="ts">
import { onUnmounted } from 'vue'
import { RouterView, onBeforeRouteUpdate } from 'vue-router'
import { useSideBarStore } from '../../stores/sidebar'
import { useTagsStore } from '../../stores/tags'

import HeaderView from '../../layout/HeaderView.vue'
import SideBarView from '../../layout/SideBarView.vue'


const userStore = useSideBarStore()

const tagsStore = useTagsStore()

// 监听浏览器mq的改变应该是
userStore.mq.addEventListener('change', userStore.handleResize)
// 改变大小
userStore.handleResize()


onUnmounted(() => {
  userStore.mq.removeEventListener('change', userStore.handleResize)
})

onBeforeRouteUpdate((to, form) => {
  console.log('from failure =>', to.meta.title, to.meta.permiss, to.fullPath)
  if (!to.meta.savePage || !form.meta.savePage) return

  const name = to.name as string
  tagsStore.currentPath = to.path

  form.fullPath === '/dashboard' && tagsStore.getTagsListItem({ title: form.meta.title, name: form.meta.title, path: form.fullPath, closeBoldIconShow: false })

  tagsStore.getTagsListItem({
    name,
    path: to.path,
    title: to.meta.title,
    isSave: to.meta.isSave,
    closeBoldIconShow: false
  })
  console.log(tagsStore.tagsPath)
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
                <KeepAlive :include="tagsStore.tagsPath">
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
  transition: opacity .2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>
