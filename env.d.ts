/// <reference types="vite/client" />

// 为了告诉 TypeScript 这些新 property，我们需要使用[模块扩充]
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $parentHost: string
        $parentPort: string
        $title: string
    }
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_NODE_ENV: string
    readonly VITE_API_BASE_URL: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}