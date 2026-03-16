# XAdmin GitHub Pages 文档站点实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 XAdmin 创建基于 VitePress 的静态文档站点，部署到 GitHub Pages，采用 Laravel 红色主题风格。

**Architecture:** 使用 VitePress 作为静态站点生成器，输出纯 HTML/CSS/JS 到 `.vitepress/dist` 目录，通过 GitHub Actions 自动部署到 GitHub Pages。

**Tech Stack:** VitePress 2.0, Vue 3, Tailwind CSS, GitHub Actions

---

## Phase 1: 项目初始化 (Day 1)

### Task 1: 创建项目基础结构

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `docs/index.md`
- Create: `docs/guide/installation.md`
- Create: `docs/guide/quickstart.md`

**Step 1: 创建 package.json**

```json
{
  "name": "xadmin-docs",
  "version": "1.0.0",
  "description": "XAdmin Documentation - A modern Laravel admin panel builder",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^2.0.0",
    "vue": "^3.5.0"
  },
  "dependencies": {
    "tailwindcss": "^4.0.0"
  }
}
```

**Step 2: 创建 .gitignore**

```
node_modules/
.vitepress/dist/
.DS_Store
```

**Step 3: 创建首页 docs/index.md**

```markdown
---
layout: home
title: XAdmin - Modern Laravel Admin Panel
titleTemplate: Laravel Admin Panel Builder with Livewire v4

hero:
  name: XAdmin
  text: Laravel Admin Panel Builder
  tagline: 基于 Livewire v4 和 Tailwind CSS 的现代化管理面板
  image:
    src: /logo.svg
    alt: XAdmin Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/installation
    - theme: alt
      text: 在 GitHub 查看
      link: https://github.com/x-multibyte/xadmin

features:
  - icon: ⚡
    title: Livewire v4 驱动
    details: 无需编写 JavaScript，使用纯 PHP 构建响应式界面
  - icon: 🎨
    title: Tailwind CSS
    details: 现代化 UI 设计，完美契合 Laravel 生态
  - icon: 🔒
    title: 类型安全
    details: PHP 8.3+ 严格类型检查，PHPStan Level 9
  - icon: 🧪
    title: 测试优先
    details: Pest + Testbench，完整的测试覆盖
  - icon: 🚀
    title: Laravel 12
    details: 完全兼容最新 Laravel 版本
  - icon: 📦
    title: 开箱即用
    details: Grid、Form、Auth，快速构建 CRUD
---
```

**Step 4: 创建安装指南 docs/guide/installation.md**

```markdown
# 安装指南

## 系统要求

- PHP 8.3+
- Laravel 12.0+
- Composer

## 步骤 1: 安装 XAdmin

通过 Composer 安装：

```bash
composer require x-multibyte/xadmin
```

## 步骤 2: 发布资源

```bash
php artisan vendor:publish --provider="XAdmin\AdminServiceProvider"
```

## 步骤 3: 运行迁移

```bash
php artisan migrate
```

## 步骤 4: 创建管理员用户

```bash
php artisan xadmin:create-user
```

## 步骤 5: 访问管理面板

访问 `http://your-app.test/admin` 即可看到 XAdmin 登录页面。

## 下一步

- [快速开始](/guide/quickstart) - 5 分钟创建第一个 Grid
- [配置说明](/guide/configuration) - 详细配置选项
```

**Step 5: 创建快速开始 docs/guide/quickstart.md**

```markdown
# 快速开始

本教程将在 5 分钟内带你创建第一个 Grid 和 Form。

## 前置条件

- 已完成 [安装](/guide/installation)
- Laravel 项目已配置数据库

## 创建第一个 Grid

### 步骤 1: 准备 Model

假设你已有 `Post` Model：

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'status'];
}
```

### 步骤 2: 创建 Grid

在路由文件中定义：

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/posts', function () {
    return XAdmin::grid(Post::class)
        ->column('id')
        ->column('title')
        ->column('status')
        ->column('created_at')
        ->sortable();
});
```

### 步骤 3: 访问

访问 `/posts` 即可看到数据列表。

## 创建第一个 Form

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title')
        ->textarea('content')
        ->select('status', [
            'draft' => '草稿',
            'published' => '已发布',
        ])
        ->rules('required');
});
```

## 下一步

- [Grid 完整文档](/components/grid)
- [Form 完整文档](/components/form)
- [认证系统](/components/auth)
```

**Step 6: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "feat: initialize docs site structure"
```

---

### Task 2: 配置 VitePress

**Files:**
- Create: `docs/.vitepress/config.js`
- Create: `docs/.vitepress/theme/index.js`
- Create: `docs/.vitepress/theme/style.css`

**Step 1: 创建 VitePress 配置文件**

```javascript
// docs/.vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XAdmin',
  description: 'Modern Laravel Admin Panel Builder with Livewire v4',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#FF2D20' }],
  ],

  themeConfig: {
    // Laravel 红色主题
    logo: '/logo.svg',
    
    siteTitle: 'XAdmin',

    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/components/grid', activeMatch: '/components/' },
      { text: '示例', link: '/examples/crud', activeMatch: '/examples/' },
      { text: 'API', link: '/api/grid-builder', activeMatch: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '配置', link: '/guide/configuration' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Grid', link: '/components/grid' },
            { text: 'Form', link: '/components/form' },
            { text: '认证', link: '/components/auth' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: 'CRUD 教程', link: '/examples/crud' },
            { text: '文件上传', link: '/examples/file-upload' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'GridBuilder', link: '/api/grid-builder' },
            { text: 'FormBuilder', link: '/api/form-builder' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/x-multibyte/xadmin' },
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 Roy Thia',
    },

    // 搜索配置
    search: {
      provider: 'local',
    },
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
  },
})
```

**Step 2: 创建自定义主题入口**

```javascript
// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
  },
}
```

**Step 3: 创建自定义样式 (Laravel 红色主题)**

```css
/* docs/.vitepress/theme/style.css */

/* Laravel 红色主题色 */
:root {
  --vp-c-brand-1: #FF2D20;
  --vp-c-brand-2: #cc2419;
  --vp-c-brand-3: #ff2d20;
  --vp-c-brand-soft: rgba(255, 45, 32, 0.1);
  
  --vp-c-text-1: #22292f;
  --vp-c-text-2: #5c6570;
  --vp-c-text-3: #9aa0a6;
  
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f8fafc;
  --vp-c-bg-elv: #ffffff;
  
  --vp-c-divider: #e2e8f0;
  --vp-c-border: #cbd5e1;
  
  --vp-code-block-bg: #f8fafc;
  --vp-code-copy-code-bg: #e2e8f0;
  --vp-code-copy-code-hover-bg: #cbd5e1;
  
  /* 字体 */
  --vp-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
}

/* 暗色模式 */
.dark {
  --vp-c-brand-1: #ff4d4d;
  --vp-c-brand-2: #ff2d20;
  --vp-c-brand-3: #cc2419;
  
  --vp-c-text-1: #f1f5f9;
  --vp-c-text-2: #94a3b8;
  --vp-c-text-3: #64748b;
  
  --vp-c-bg: #0f172a;
  --vp-c-bg-alt: #1e293b;
  --vp-c-bg-elv: #1e293b;
  
  --vp-c-divider: #334155;
  --vp-c-border: #475569;
  
  --vp-code-block-bg: #1e293b;
}

/* 按钮样式 */
.VPButton.brand {
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.VPButton.brand:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

/* 链接样式 */
.vp-doc a {
  color: var(--vp-c-brand-1);
}

.vp-doc a:hover {
  color: var(--vp-c-brand-2);
}

/* 首页 Hero 优化 */
.VPHero {
  padding: 4rem 0;
}

.VPHero .name {
  color: var(--vp-c-brand-1);
}

/* 特性卡片 */
.VPFeature {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 45, 32, 0.1);
}

/* 导航栏样式 */
.VPNav {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.7);
}

.dark .VPNav {
  background: rgba(15, 23, 42, 0.7);
}
```

**Step 4: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "feat: configure VitePress with Laravel red theme"
```

---

### Task 3: 创建 Logo 和 Favicon

**Files:**
- Create: `public/logo.svg`
- Create: `public/favicon.ico`

**Step 1: 创建 SVG Logo**

```xml
<!-- public/logo.svg -->
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景圆形 -->
  <circle cx="100" cy="100" r="95" fill="#FF2D20"/>
  
  <!-- X 字母 -->
  <path d="M60 60 L140 140 M140 60 L60 140" 
        stroke="white" 
        stroke-width="16" 
        stroke-linecap="round"/>
  
  <!-- Admin 文字 -->
  <text x="100" y="175" 
        font-family="Arial, sans-serif" 
        font-size="14" 
        font-weight="bold" 
        fill="white" 
        text-anchor="middle">
    ADMIN
  </text>
</svg>
```

**Step 2: 生成 Favicon**

使用在线工具或 ImageMagick：

```bash
# 如果有 ImageMagick
convert public/logo.svg -define icon:auto-resize=64,48,32,16 public/favicon.ico
```

**Step 3: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add public/
git commit -m "feat: add logo and favicon"
```

---

## Phase 2: 核心文档内容 (Day 2)

### Task 4: Grid 组件文档

**Files:**
- Create: `docs/components/grid.md`

**Step 1: 创建 Grid 文档**

```markdown
# Grid 组件

Grid 是 XAdmin 中最常用的组件，用于展示表格数据。

## 基础用法

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->column('created_at');
```

## 列定义

### 基础列

```php
->column('title')
```

### 自定义标签

```php
->column('title', '文章标题')
```

### 可排序列

```php
->column('created_at')->sortable()
```

## 排序功能

Grid 支持按列排序：

```php
$grid = XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('created_at')
    ->sortable();
```

## 过滤功能

### 快速搜索

```php
$grid->filter(function ($filter) {
    $filter->like('title');
    $filter->equal('status');
});
```

## 分页

```php
->paginate(20)
```

## 完整示例

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id', 'ID')->sortable()
    ->column('title', '标题')
    ->column('status', '状态')
    ->column('created_at', '创建时间')
    ->paginate(20)
    ->filter(function ($filter) {
        $filter->like('title');
        $filter->equal('status');
    });
```
```

**Step 2: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "docs: add Grid component documentation"
```

---

### Task 5: Form 组件文档

**Files:**
- Create: `docs/components/form.md`

**Step 1: 创建 Form 文档**

```markdown
# Form 组件

Form 组件用于创建和编辑数据记录。

## 基础用法

### 创建表单

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::form(Post::class)
    ->text('title')
    ->textarea('content')
    ->select('status', [
        'draft' => '草稿',
        'published' => '已发布',
    ]);
```

## 字段类型

- `text()` - 文本输入
- `email()` - 邮箱
- `password()` - 密码
- `number()` - 数字
- `textarea()` - 多行文本
- `select()` - 下拉选择
- `checkbox()` - 复选框
- `radio()` - 单选框
- `date()` - 日期
- `datetime()` - 日期时间
- `switch()` - 开关
- `image()` - 图片上传
- `file()` - 文件上传

## 验证

```php
->text('email')
    ->rules('required|email')

->text('title')
    ->required()
```

## 文件上传

```php
->image('avatar')
    ->rules('image|max:2048')
```

## 完整示例

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::form(Post::class)
    ->text('title')
        ->required()
    ->textarea('content')
        ->required()
    ->select('status', [
        'draft' => '草稿',
        'published' => '已发布',
    ])
    ->image('featured_image')
        ->rules('image|max:2048');
```
```

**Step 2: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "docs: add Form component documentation"
```

---

### Task 6: 认证系统文档

**Files:**
- Create: `docs/components/auth.md`

**Step 1: 创建认证文档**

```markdown
# 认证系统

XAdmin 提供完整的认证和授权系统。

## 认证中间件

所有管理面板路由自动应用认证中间件。

## 用户管理

### 创建用户

```bash
php artisan xadmin:create-user
```

### 重置密码

```bash
php artisan xadmin:reset-password
```

## 登录页面

访问 `/admin/login` 即可看到登录页面。
```

**Step 2: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "docs: add Auth component documentation"
```

---

## Phase 3: 示例和部署 (Day 3-4)

### Task 7: CRUD 实战示例

**Files:**
- Create: `docs/examples/crud.md`

**Step 1: 创建 CRUD 示例**

```markdown
# CRUD 实战教程

## 步骤 1: 创建 Model

```bash
php artisan make:model Post -m
```

## 步骤 2: 运行迁移

```bash
php artisan migrate
```

## 步骤 3: 创建 Grid

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/posts', function () {
    return XAdmin::grid(Post::class)
        ->column('id')
        ->column('title')
        ->column('status')
        ->paginate(20);
});
```

## 步骤 4: 创建 Form

```php
Route::get('/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title')
            ->required()
        ->textarea('content')
            ->required()
        ->select('status', [
            'draft' => '草稿',
            'published' => '已发布',
        ]);
});
```
```

**Step 2: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "docs: add CRUD tutorial example"
```

---

### Task 8: GitHub Actions 部署配置

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: 创建 GitHub Actions 工作流**

```yaml
# .github/workflows/deploy.yml
name: Deploy Docs to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'website/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/package-lock.json

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci
        working-directory: ./website

      - name: Build
        run: npm run build
        working-directory: ./website

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./website/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: 提交**

```bash
cd /Users/roy/x-multibyte/xadmin/website
git add .
git commit -m "ci: add GitHub Actions deployment workflow"
```

---

## 测试清单

在部署前，请确保完成以下测试：

- [ ] 本地开发服务器正常运行 (`npm run dev`)
- [ ] 构建无错误 (`npm run build`)
- [ ] 所有链接有效
- [ ] 移动端响应式正常
- [ ] 暗色模式显示正常
- [ ] 搜索功能正常

---

## 部署后验证

部署到 GitHub Pages 后：

1. 访问 `https://x-multibyte.github.io/xadmin`
2. 验证所有页面加载正常
3. 测试导航和搜索
4. 检查移动端显示

---

## 总结

完成本计划后，你将拥有：

✅ 精美的 Laravel 红色主题文档站点
✅ 完整的安装指南和快速开始教程
✅ Grid/Form/Auth 组件详细文档
✅ CRUD 实战示例
✅ GitHub Actions 自动部署

**预计完成时间:** 4 天
**总任务数:** 8 个主要任务
**预计提交次数:** 8+ 次
