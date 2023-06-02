import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTagsStore = defineStore('tags', () => {
    // 标签类型
    interface ITagsList {
        name: string
        title: string
        isSave: boolean
        path: string,
        closeBoldIconShow: boolean
    }
    // 创建那些标签列表
    const tagsList = ref<ITagsList[]>([])

    // 当关闭标签时回到上一个编辑的标签
    const historyTagsList = ref<ITagsList[]>([])

    const tagsPath = computed(() => {
        return tagsList.value.map(item => item.path)
    })

    // 当前路径
    const currentPath = ref('')
    // 缓存的标签数据
    const local_tags_list = JSON.parse(localStorage.getItem('local_tags_list') as string)
    if (localStorage.getItem('local_tags_list') && Array.isArray(local_tags_list)) {
        tagsList.value = local_tags_list
    }
    console.log(tagsList.value)

    // 获取并且添加标签列表
    const getTagsListItem = (tagsListItem: ITagsList): void => {

        tagsList.value = [...tagsList.value, tagsListItem]
        // 数据做去重处理
        tagsList.value = tagsList.value.reduce((acc: ITagsList[], curr) => {
            const index = acc.findIndex((item) => item.path === curr.path)
            if (index < 0) {
                acc.push(curr)
            }
            return acc
        }, [])
        // 缓存数据到本地
        localStorageTagsList(tagsList.value)
    }

    // 关闭当前标签
    const colseCurrentTagsListItem = (tagsListItem: ITagsList): void => {
        console.log(tagsListItem)
    }

    // 删除标签
    const deleteTagesListItem = (tagsListItem: ITagsList): void => {
        console.log(tagsListItem)
        tagsList.value = tagsList.value.filter(item => item.path !== tagsListItem.path)

    }
    // 清空标签
    const clearTagesList = (): void => {
        tagsList.value = []
    }
    // 关闭其他标签页
    const closeOtherTagsListItem = (): void => {

    }
    // 标签页本地缓存
    const localStorageTagsList = (list: ITagsList[]): void => {
        localStorage.setItem('local_tags_list', JSON.stringify(list))
    }

    return {
        tagsList,
        historyTagsList,
        currentPath,
        tagsPath,
        getTagsListItem,
        colseCurrentTagsListItem,
        deleteTagesListItem,
        clearTagesList,
        closeOtherTagsListItem,
        localStorageTagsList
    }
})