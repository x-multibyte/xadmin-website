// docs/.vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XAdmin',
  description: 'Modern Laravel Admin Panel Builder with Livewire v4',
  
  // GitHub Pages base path
  base: '/xadmin-website/',

  head: [
    ['link', { rel: 'icon', href: '/xadmin-website/favicon.ico' }],
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

  // 忽略死链检查（用于开发阶段）
  ignoreDeadLinks: true,
})
