export interface RouterMate {
    savePage: true,
    title: string,
    permiss?: '1',
    // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个
    isSave?: false
}