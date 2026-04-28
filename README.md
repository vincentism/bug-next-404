# OpenCreator Website

OpenCreator 官网项目，基于 Next.js App Router、Tailwind CSS、HeroUI、next-intl 和 Sentry。

## 本地开发

```bash
pnpm install
pnpm dev
```

默认开发地址是 `http://localhost:3000`。

## 环境变量

复制 `.env.example` 到 `.env.local`，并根据当前环境修改域名：

```bash
cp .env.example .env.local
```

主要变量：

- `NEXT_PUBLIC_SITE_URL`：官网自身域名，用于 sitemap、robots 和结构化数据。
- `NEXT_PUBLIC_APP_URL`：App 跳转目标域名，测试和正式环境分别配置。
- `NEXT_PUBLIC_SERVER_URL`：后端 API 域名，用于模型页和价格页读取计划配置。
- `NEXT_PUBLIC_SENTRY_DSN`：可选，Sentry 上报地址。

## 常用命令

```bash
pnpm lint
pnpm type-check
pnpm build
pnpm analyzer
```

## 配置说明

- `next.config.ts`：Next.js、Sentry、next-intl、Turbopack、重定向和图片配置。
- `tailwind.config.ts`：Tailwind、HeroUI 主题和设计系统 token。
- `postcss.config.js`：Tailwind 与 Autoprefixer 的 PostCSS 配置。
- `components.json`：shadcn/magicui 组件生成配置。
