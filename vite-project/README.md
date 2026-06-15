# 硅谷甄选运营平台

基于 **Vue 3 + TypeScript + Vite** 构建的综合电商后台管理系统，涵盖权限管理、商品管理和数据可视化大屏等核心功能模块。

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.13-409EFF?logo=element&logoColor=white)](https://element-plus.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?logo=vue.js&logoColor=black)](https://pinia.vuejs.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.4-AA344D?logo=apacheecharts&logoColor=white)](https://echarts.apache.org/)

---

## 📸 功能概览

| 模块 | 功能 |
|------|------|
| 🔐 登录/鉴权 | Token 认证、动态路由、按钮权限控制 |
| 👤 权限管理 | 用户管理、角色管理、菜单管理（RBAC） |
| 📦 商品管理 | 品牌管理、属性管理、SPU 管理、SKU 管理 |
| 📊 数据大屏 | ECharts 可视化：地图、折线图、年龄/性别分布、排行榜、游客流量 |
| 🏠 首页 | 用户欢迎页、快捷入口 |
| 🎨 布局 | 侧边菜单栏、标签页导航、面包屑、Logo |

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API + `<script setup>`) |
| 语言 | TypeScript |
| 构建工具 | Vite 8 |
| UI 组件库 | Element Plus |
| 状态管理 | Pinia |
| 路由 | Vue Router 5 |
| HTTP 请求 | Axios |
| 图表 | ECharts |
| CSS 预处理 | SCSS |
| 图标 | SVG Icons + Element Plus Icons |
| 工具库 | Lodash、NProgress、Mock.js |

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18
- **pnpm** 或 **npm**

### 安装依赖

```bash
cd vite-project
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

浏览器访问 `http://localhost:5173`

### 构建与预览

```bash
# 测试环境构建
pnpm build:test

# 生产环境构建
pnpm build:pro

# 预览构建结果
pnpm preview
```

---

## 📁 项目结构

```
vite-project/
├── public/                    # 静态资源（不经过编译）
├── src/
│   ├── api/                   # API 接口层
│   │   ├── acl/               #   权限管理接口
│   │   ├── product/           #   商品管理接口
│   │   └── user/              #   用户登录接口
│   ├── assets/                # 静态资源（图片、SVG 等）
│   ├── components/            # 全局公共组件
│   ├── layout/                # 布局组件
│   │   ├── logo/              #   Logo
│   │   ├── main/              #   主内容区
│   │   ├── menu/              #   侧边菜单
│   │   └── tabbar/            #   标签页导航 + 面包屑
│   ├── router/                # 路由配置
│   │   ├── index.ts           #   路由实例
│   │   └── routes.ts          #   常量路由 + 异步路由 + 任意路由
│   ├── store/                 # Pinia 状态管理
│   │   └── modules/           #   user / setting / category / layoutSetting
│   ├── styles/                # 全局样式 & SCSS 变量
│   ├── utils/                 # 工具函数
│   │   ├── request.ts         #   Axios 封装（拦截器、Token 注入）
│   │   ├── token.ts           #   Token 本地存储
│   │   └── time.ts            #   时间格式化
│   └── views/                 # 页面组件
│       ├── login/             #   登录页
│       ├── home/              #   首页
│       ├── screen/            #   数据大屏
│       │   └── components/    #     图表子组件
│       ├── acl/               #   权限管理
│       │   ├── user/          #     用户管理
│       │   ├── role/          #     角色管理
│       │   └── permission/    #     菜单管理
│       ├── product/           #   商品管理
│       │   ├── trademark/     #     品牌管理
│       │   ├── attr/          #     属性管理
│       │   ├── spu/           #     SPU 管理
│       │   └── sku/           #     SKU 管理
│       └── 404/               #   404 页面
├── .env.development           # 开发环境变量
├── .env.test                  # 测试环境变量
├── .env.production            # 生产环境变量
├── vite.config.js             # Vite 配置
├── tsconfig.json              # TypeScript 配置
└── package.json
```

---

## ⚙️ 环境变量

| 变量 | 说明 | 开发环境 | 生产环境 |
|------|------|----------|----------|
| `VITE_APP_TITLE` | 应用标题 | 硅谷甄选运营平台 | 硅谷甄选运营平台 |
| `VITE_APP_BASE_API` | API 基础路径 | `/api`（走 Vite 代理） | `http://127.0.0.1:10086` |
| `VITE_SERVE` | 后端服务器地址 | `http://117.72.157.194:10086/` | - |

### 代理配置

开发环境下 `/api` 前缀的请求会被 Vite 代理转发到后端服务器，解决跨域问题：

```js
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://117.72.157.194:10086/',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    }
  }
}
```

---

## 🔑 权限架构

项目采用 **RBAC** 权限模型：

1. **用户登录** → 获取 Token
2. **请求用户信息** → 获取角色、按钮权限、路由列表
3. **动态路由** → 根据后端返回的路由列表过滤异步路由并动态注册
4. **按钮权限** → 通过 `buttons` 数组控制页面按钮的显示/隐藏

```
登录 → Token → 用户信息(角色+路由+按钮) → 动态路由 → 菜单渲染
```

---

## 📊 数据大屏

数据大屏模块使用 ECharts 实现，包含以下图表组件：

- **Map** — 地图分布
- **Line** — 折线趋势图
- **Age** — 年龄分布
- **Sex** — 性别比例
- **Rank** — 排行榜
- **Tourist** — 游客流量
- **Year** — 年度统计
- **Counter** — 计数器卡片

---

## 🔗 后端接口

项目需要配合 Java 后端服务使用。接口基础路径配置在 `.env.*` 文件中。

### 主要接口

| 模块 | 路径 |
|------|------|
| 登录 | `/admin/acl/index/login` |
| 用户信息 | `/admin/acl/index/info` |
| 用户管理 | `/admin/acl/user/` |
| 角色管理 | `/admin/acl/role/` |
| 菜单管理 | `/admin/acl/permission/` |
| 商品品牌 | `/admin/product/baseTrademark/` |
| 商品属性 | `/admin/product/baseAttrInfo/` |
| SPU | `/admin/product/` |
| SKU | `/admin/product/listSku/` |

---

## 📝 License

MIT
