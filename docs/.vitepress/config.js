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

  // i18n configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'XAdmin',
      description: 'Modern Laravel Admin Panel Builder with Livewire v4',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/installation', activeMatch: '/guide/' },
          { text: 'Components', link: '/components/grid', activeMatch: '/components/' },
          { text: 'Examples', link: '/examples/crud', activeMatch: '/examples/' },
          { text: 'API', link: '/api/grid-builder', activeMatch: '/api/' },
          {
            text: 'Languages',
            items: [
              { text: 'English', link: '/guide/installation' },
              { text: '中文', link: '/zh/guide/installation' },
            ],
          },
        ],

        sidebar: {
          '/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Installation', link: '/guide/installation' },
                { text: 'Quick Start', link: '/guide/quickstart' },
                { text: 'Configuration', link: '/guide/configuration' },
              ],
            },
          ],
          '/components/': [
            {
              text: 'Components',
              items: [
                { text: 'Grid', link: '/components/grid' },
                { text: 'Form', link: '/components/form' },
                { text: 'Authentication', link: '/components/auth' },
              ],
            },
          ],
          '/examples/': [
            {
              text: 'Examples',
              items: [
                { text: 'CRUD Tutorial', link: '/examples/crud' },
                { text: 'File Upload', link: '/examples/file-upload' },
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
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2026 Roy Thia',
        },

        // Search configuration
        search: {
          provider: 'local',
        },
      },
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'XAdmin',
      description: '基于 Livewire v4 的现代化 Laravel 管理面板构建器',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/installation', activeMatch: '/zh/guide/' },
          { text: '组件', link: '/zh/components/grid', activeMatch: '/zh/components/' },
          { text: '示例', link: '/zh/examples/crud', activeMatch: '/zh/examples/' },
          { text: 'API', link: '/zh/api/grid-builder', activeMatch: '/zh/api/' },
          {
            text: 'Languages',
            items: [
              { text: 'English', link: '/guide/installation' },
              { text: '中文', link: '/zh/guide/installation' },
            ],
          },
        ],

        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '安装', link: '/zh/guide/installation' },
                { text: '快速开始', link: '/zh/guide/quickstart' },
                { text: '配置', link: '/zh/guide/configuration' },
              ],
            },
          ],
          '/zh/components/': [
            {
              text: '组件',
              items: [
                { text: 'Grid', link: '/zh/components/grid' },
                { text: 'Form', link: '/zh/components/form' },
                { text: '认证系统', link: '/zh/components/auth' },
              ],
            },
          ],
          '/zh/examples/': [
            {
              text: '示例',
              items: [
                { text: 'CRUD 教程', link: '/zh/examples/crud' },
                { text: '文件上传', link: '/zh/examples/file-upload' },
              ],
            },
          ],
          '/zh/api/': [
            {
              text: 'API',
              items: [
                { text: 'GridBuilder', link: '/zh/api/grid-builder' },
                { text: 'FormBuilder', link: '/zh/api/form-builder' },
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
    },
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
  },

  // 忽略死链检查（用于开发阶段）
  ignoreDeadLinks: true,
})
