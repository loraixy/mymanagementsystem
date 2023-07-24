<script setup lang="ts">
import { onUnmounted, ref, getCurrentInstance } from 'vue'

import { RouterView, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useSideBarStore } from '../../stores/sidebar'
import { useTagsStore } from '../../stores/tags'
import { menu } from '../../apis/MenuManagement'

import type { IMenu } from '../../typings/system'
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

import HeaderView from '../../layout/HeaderView.vue'
import SideBarView from '../../layout/SideBarView.vue'

const userStore = useSideBarStore()

const tagsStore = useTagsStore()

const route = useRoute()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { $title } = proxy as ComponentPublicInstance

const menuList = ref<IMenu[]>([])

const getMenuData = async (): Promise<void> => {
  try {
    const { data: { data, code, message } } = await menu.getMenu()
    menuList.value = data[0]

    localStorage.setItem('menu_list', JSON.stringify(data))

    console.log(menuList.value, code, message)
  } catch (error) {
    console.log(error)
  }
}

if (localStorage.getItem('menu_list') && localStorage.getItem('ms_title') === $title) {
  menuList.value = JSON.parse(localStorage.getItem('menu_list') as string)[0]
} else {
  getMenuData()
}

// 监听浏览器mq的改变应该是
userStore.mq.addEventListener('change', userStore.handleResize)
// 改变大小
userStore.handleResize()

tagsStore.getTagsListItem({
  title: route.meta.title,
  name: route.name as string,
  path: route.fullPath,
  closeBoldIconShow: false
})
tagsStore.currentPath = route.fullPath
onBeforeRouteUpdate((to, form) => {
  console.log('from failure =>', to.meta.title, to.meta.premiss, to.fullPath)
  if (!to.meta.savePage || !form.meta.savePage) return

  const name = to.name as string
  tagsStore.currentPath = to.path

  form.fullPath === '/dashboard' && tagsStore.getTagsListItem({ title: form.meta.title, name: form.name as string, path: form.fullPath, closeBoldIconShow: false })

  tagsStore.getTagsListItem({
    name,
    path: to.path,
    title: to.meta.title,
    isSave: to.meta.isSave,
    closeBoldIconShow: false
  })
  console.log(tagsStore.tagsPath)
})

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
        <ElAside class=" aside h-screen " width="auto" style="background-color: var(--lor-blue);">
          <SideBarView :menuList="menuList" />
        </ElAside>

        <ElMain class=" bg-[--lor-main-bg-color] ">
          <div class=" min-h-full ">
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
  --el-main-padding: 12px;
}

.aside::-webkit-scrollbar {
  width: 0;
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
  transition: opacity .1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>
