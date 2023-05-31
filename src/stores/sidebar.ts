import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSideBarStore = defineStore('sidebar', () => {
    const isCollapse = ref(false)

    // 获取媒体查询值
    const mq = window.matchMedia('(max-width: 480px)')
    // 用于处理侧边栏的显示状态
    const handleIsCollapse = (): void => {
        if (mq.matches) return
        isCollapse.value = !isCollapse.value
    }

    // 处理大小变化
    const handleResize = () => {
        console.log(mq)
        isCollapse.value = mq.matches;
    }

    return { isCollapse, mq, handleIsCollapse, handleResize }
})