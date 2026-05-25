/// <reference types="vite/client" />

// 1. 给 .vue 文件添加类型声明（解决你最关键的报错）
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 2. 环境变量类型（你原来的内容，保留）
interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}