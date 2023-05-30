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

    /**
     * 树形结构寻找
     * function updateItemInTreeData(treeData, itemId, newItem) {
  for (let node of treeData) {
    if (node.id === itemId) {
      // 此处假设我们想要修改 id 为 itemId 的节点下最里面数组的第0项
      const deepestArray = getDeepestArray(node);
      if (deepestArray) {
        // 修改最后一个元素
        deepestArray[0] = newItem;
      } else {
        console.error('找不到要修改的数组');
      }
      return;
    } else if (node.children) {
      updateItemInTreeData(node.children, itemId, newItem);
    }
  }
}

// 辅助函数，用于找到最深处的数组并返回它
function getDeepestArray(node) {
  let current = node;
  while (current.children && current.children.length) {
    current = current.children[current.children.length - 1];
  }
  return Array.isArray(current) ? current : null;
}


     */

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