import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userTagsStore = defineStore('tags', () => {
    // 标签类型
    interface ITagsList {
        name: string
        title: string
        isSave: boolean
        path: string
    }
    // 创建那些标签列表
    const tagsList = ref<ITagsList[]>([])

    // 当关闭标签时回到上一个编辑的标签
    const historyTagsList = ref<ITagsList[]>([])

    // 获取并且添加标签列表
    const getTagsListItem = (tagsListItem: ITagsList): void => {
        tagsList.value = [...tagsList.value, tagsListItem]
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

    return {
        tagsList,
        historyTagsList,
        getTagsListItem,
        colseCurrentTagsListItem,
        deleteTagesListItem,
        clearTagesList,
        closeOtherTagsListItem
    }
})