# OpenCreator Website

OpenCreator 官网：营销落地页、工作流模板页、模型说明、定价与博客等内容，基于 **Next.js App Router**，配合 **Tailwind CSS v4**、**HeroUI**、**next-intl** 与 **Sentry**。

## 技术栈

| 类别 | 选用 |
| --- | --- |
| 框架 | Next.js 15（Turbopack 开发）、React 19 |
| 样式与组件 | Tailwind CSS 4、HeroUI、Lucide、cva / tailwind-merge |
| 国际化 | next-intl（`en` / `zh`，默认 `en`，`localePrefix: as-needed`） |
| 动效 | GSAP、Framer Motion |
| 可观测 | Sentry（`@sentry/nextjs`） |
| 内容 | Markdown（gray-matter、react-markdown、GFM）等 |

包管理使用 **pnpm**（见 `package.json` 中的 `packageManager` 字段）。

## 前置条件

- **Node.js**：建议 **20.x** 或与团队 CI/部署一致的 LTS 版本。
- **pnpm**：与锁文件/ `packageManager` 版本一致安装（如 `corepack enable` 后使用项目指定版本）。

## 本地开发

```bash
pnpm install
pnpm dev
```

默认开发地址：`http://localhost:3000`。开发脚本使用 `--turbopack` 以加快本地热更新。

## 生产构建与本地预览

```bash
pnpm build
pnpm start
```

部署到 Vercel 等环境时，可使用与 `pnpm build` 等效的 `pnpm vercel-build`。

## 环境变量

复制示例文件并按环境填写：

```bash
cp .env.example .env.local
```

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 站点自身 URL，用于 sitemap、robots、结构化数据 |
| `NEXT_PUBLIC_APP_URL` | 跳转 OpenCreator App 的基地址（测试/生产分别配置） |
| `NEXT_PUBLIC_SERVER_URL` | 后端 API 基地址（模型页、定价等拉取计划等数据） |
| `NEXT_PUBLIC_SENTRY_DSN` | 可选；浏览器与服务的 Sentry DSN |

构建时可额外设置 **`BUILD_VERSION`**（或通过仓库中的 `.build-version` 文件）供构建产物版本追踪；详见 `next.config.ts` 中的 `getBuildVersion`。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 本地开发（Turbopack） |
| `pnpm build` | 生产构建 |
| `pnpm start` | 启动生产服务器（需先 `build`） |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint 并尝试自动修复 |
| `pnpm type-check` | TypeScript：`tsc --noEmit` |
| `pnpm format` | Prettier 格式化 |
| `pnpm analyzer` | `ANALYZE=true` 构建并打开打包体积分析 |

## 仓库结构（概要）

- `src/app/`：App Router；多语言路由在 `src/app/[locale]/`（模板落地页 `template-*`、模型页 `models/*`、定价 `pricing` 等）。
- `src/components/`：页面与业务组件（含 landing、blog、SEO、PWA 等子目录）。
- `src/i18n/`：`next-intl` 路由、请求配置与文案。
- `src/lib/`：工具函数（SEO、博客、CDN、地区与链接等）。

博客与 Markdown 等资源按现有目录约定存放（详见各路由与 `src/lib/blog` 等）。

## 配置文件

- `next.config.ts`：Next.js、Sentry、next-intl、Turbopack、重定向与图片等。
- `tailwind.config.ts` / `postcss.config.js`：Tailwind v4、HeroUI 主题与设计 token。
- `components.json`：shadcn / Magic UI 类组件生成配置。
- `eslint.config.mjs`（若存在）或与 Next 对齐的 ESLint 入口：`pnpm lint` 的目标路径见 `package.json` 中 `lint` 脚本。
