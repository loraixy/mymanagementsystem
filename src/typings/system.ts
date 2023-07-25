export interface IMenu {
    /**
     * 图标
     */
    ico: string
    /** 
     * 不懂什么id
    */
    id: number
    /**
     * 什么什么日期
     */
    modifydate: string
    /** 
     * 路由名
    */
    name: string
    /**
     * 父级
     */
    parameter: string
    /** 
     * 父级
    */
    parent: number
    /** 
     * 父级标题
    */
    parenttitle: null
    /**
     * 路径
     */
    path: string
    /**
     * 备注
     */
    remarks: null
    /**
     * 不懂是什么排序吧可能
     */
    sflag: string | number
    /**
     * 排序码
     */
    sortcode: number
    /**
     * 标题
     */
    title: string
    /**
     * 路径
     */
    ulr: string
}