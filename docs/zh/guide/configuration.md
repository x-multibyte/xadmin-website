# 配置指南

> **版本说明**：本文档适用于 XAdmin 1.x 版本。配置选项可能在未来的版本中发生变化。

XAdmin 提供了一个全面的配置文件，允许你自定义管理面板的各个方面。本指南涵盖了所有可用的配置选项。

## 配置文件位置

发布资源文件后，配置文件将位于：

```
config/xadmin.php
```

## 核心配置结构

配置文件按逻辑分为几个部分：

```php
<?php

return [
    // 认证设置
    'auth' => [...],

    // UI/主题自定义
    'ui' => [...],

    // Grid 默认值
    'grid' => [...],

    // Form 默认值
    'form' => [...],

    // 资源文件配置
    'assets' => [...],
];
```

## 认证配置

配置用户如何登录管理面板。

```php
'auth' => [
    // 使用的认证守卫
    'guard' => 'web',

    // 用户模型类
    'model' => App\Models\User::class,

    // 启用/禁用注册
    'registration' => true,

    // 登录页面设置
    'login' => [
        'path' => '/admin/login',
        'redirect_to' => '/admin',
    ],

    // 密码重置设置
    'password_reset' => [
        'enabled' => true,
        'token_expire' => 60, // 分钟
    ],
],
```

### 认证选项说明

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `guard` | 字符串 | `web` | Laravel 认证守卫 |
| `model` | 字符串 | `User::class` | 认证用户模型 |
| `registration` | 布尔值 | `true` | 允许新用户注册 |
| `login.path` | 字符串 | `/admin/login` | 登录路由路径 |
| `login.redirect_to` | 字符串 | `/admin` | 登录后跳转 URL |
| `password_reset.enabled` | 布尔值 | `true` | 启用密码重置功能 |
| `password_reset.token_expire` | 整数 | `60` | 重置令牌有效期（分钟） |

## UI 和主题配置

自定义管理面板的视觉外观。

```php
'ui' => [
    // 管理面板标题
    'title' => 'XAdmin',

    // Logo 配置
    'logo' => [
        'type' => 'text', // 或 'image'
        'value' => 'XAdmin',
        'image_path' => null,
    ],

    // 主题设置
    'theme' => [
        'primary_color' => '#FF2D20',
        'sidebar_collapsed' => false,
        'dark_mode' => [
            'enabled' => true,
            'default' => 'light', // 'light', 'dark', 或 'system'
        ],
    ],

    // 布局配置
    'layout' => [
        'sidebar_width' => '240px',
        'max_content_width' => '1400px',
    ],

    // 页脚文本
    'footer' => [
        'show_version' => true,
        'custom_text' => null,
    ],
],
```

### 主题选项说明

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | 字符串 | `XAdmin` | 浏览器标题和头部文本 |
| `logo.type` | 字符串 | `text` | Logo 类型：`text` 或 `image` |
| `logo.value` | 字符串 | `XAdmin` | 文本 Logo 内容 |
| `logo.image_path` | 字符串/null | `null` | Logo 图片路径 |
| `theme.primary_color` | 字符串 | `#FF2D20` | 主题主色 |
| `theme.sidebar_collapsed` | 布尔值 | `false` | 默认收起侧边栏 |
| `theme.dark_mode.enabled` | 布尔值 | `true` | 启用深色模式切换 |
| `theme.dark_mode.default` | 字符串 | `light` | 默认配色方案 |

## Grid 配置默认值

为整个管理面板的数据表格设置默认行为。

```php
'grid' => [
    // 分页设置
    'pagination' => [
        'enabled' => true,
        'per_page' => 15,
        'per_page_options' => [10, 15, 25, 50, 100],
    ],

    // 默认操作
    'actions' => [
        'view' => true,
        'edit' => true,
        'delete' => true,
        'bulk_delete' => true,
    ],

    // 过滤选项
    'filters' => [
        'enabled' => true,
        'persist_state' => true,
    ],

    // 排序默认值
    'sorting' => [
        'enabled' => true,
        'default_column' => 'created_at',
        'default_direction' => 'desc',
    ],

    // 导出设置
    'export' => [
        'enabled' => true,
        'formats' => ['csv', 'excel', 'pdf'],
    ],
],
```

### Grid 选项说明

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `pagination.enabled` | 布尔值 | `true` | 启用分页 |
| `pagination.per_page` | 整数 | `15` | 默认每页显示数量 |
| `pagination.per_page_options` | 数组 | `[10, 15, 25, 50, 100]` | 可选分页数量 |
| `actions.view` | 布尔值 | `true` | 显示查看操作按钮 |
| `actions.edit` | 布尔值 | `true` | 显示编辑操作按钮 |
| `actions.delete` | 布尔值 | `true` | 显示删除操作按钮 |
| `actions.bulk_delete` | 布尔值 | `true` | 启用批量删除 |
| `filters.enabled` | 布尔值 | `true` | 启用列过滤器 |
| `filters.persist_state` | 布尔值 | `true` | 在会话中保存过滤状态 |
| `sorting.enabled` | 布尔值 | `true` | 启用列排序 |
| `export.enabled` | 布尔值 | `true` | 启用数据导出 |

## Form 配置默认值

配置表单的默认行为。

```php
'form' => [
    // 验证显示
    'validation' => [
        'display_mode' => 'inline', // 'inline' 或 'toast'
        'show_asterisk' => true, // 为必填字段显示 *
    ],

    // 文件上传默认值
    'upload' => [
        'disk' => 'public',
        'max_file_size' => 5120, // KB (5MB)
        'allowed_extensions' => ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
        'image_preview' => [
            'enabled' => true,
            'width' => 200,
            'height' => 200,
        ],
    ],

    // 富文本编辑器
    'editor' => [
        'default' => 'quill', // 'quill', 'ckeditor', 或 'textarea'
        'quill' => [
            'toolbar' => [
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ],
        ],
    ],

    // 日期/时间选择器
    'datetime' => [
        'date_format' => 'YYYY-MM-DD',
        'time_format' => 'HH:mm',
        'locale' => 'zh-CN',
    ],

    // 自动保存草稿
    'autosave' => [
        'enabled' => false,
        'interval' => 30, // 秒
    ],
],
```

### Form 选项说明

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `validation.display_mode` | 字符串 | `inline` | 错误显示样式 |
| `validation.show_asterisk` | 布尔值 | `true` | 标记必填字段 |
| `upload.disk` | 字符串 | `public` | 上传文件存储磁盘 |
| `upload.max_file_size` | 整数 | `5120` | 最大文件大小（KB） |
| `upload.allowed_extensions` | 数组 | `[...]` | 允许的文件类型 |
| `upload.image_preview.enabled` | 布尔值 | `true` | 显示图片预览 |
| `editor.default` | 字符串 | `quill` | 默认富文本编辑器 |
| `datetime.date_format` | 字符串 | `YYYY-MM-DD` | 日期显示格式 |
| `autosave.enabled` | 布尔值 | `false` | 自动保存表单草稿 |

## 资源文件配置

控制资源文件的加载和缓存方式。

```php
'assets' => [
    // 要包含的 CSS 文件
    'css' => [
        // 'custom.css',
    ],

    // 要包含的 JavaScript 文件
    'js' => [
        // 'custom.js',
    ],

    // CDN 配置（可选）
    'cdn' => [
        'enabled' => false,
        'url' => null,
    ],

    // 版本号（用于缓存破坏）
    'version' => '1.0.0',
],
```

## 完整配置示例

以下是一个适用于生产环境的完整配置：

```php
<?php

return [
    'auth' => [
        'guard' => 'web',
        'model' => App\Models\User::class,
        'registration' => false, // 生产环境禁用
        'login' => [
            'path' => '/admin/login',
            'redirect_to' => '/admin/dashboard',
        ],
        'password_reset' => [
            'enabled' => true,
            'token_expire' => 60,
        ],
    ],

    'ui' => [
        'title' => '我的管理面板',
        'logo' => [
            'type' => 'image',
            'value' => 'Admin',
            'image_path' => '/images/logo.png',
        ],
        'theme' => [
            'primary_color' => '#2563EB',
            'sidebar_collapsed' => false,
            'dark_mode' => [
                'enabled' => true,
                'default' => 'system',
            ],
        ],
        'layout' => [
            'sidebar_width' => '280px',
            'max_content_width' => '1600px',
        ],
        'footer' => [
            'show_version' => true,
            'custom_text' => '© 2026 我的公司',
        ],
    ],

    'grid' => [
        'pagination' => [
            'enabled' => true,
            'per_page' => 25,
            'per_page_options' => [10, 25, 50, 100],
        ],
        'actions' => [
            'view' => true,
            'edit' => true,
            'delete' => true,
            'bulk_delete' => true,
        ],
        'filters' => [
            'enabled' => true,
            'persist_state' => true,
        ],
        'sorting' => [
            'enabled' => true,
            'default_column' => 'created_at',
            'default_direction' => 'desc',
        ],
        'export' => [
            'enabled' => true,
            'formats' => ['csv', 'excel'],
        ],
    ],

    'form' => [
        'validation' => [
            'display_mode' => 'inline',
            'show_asterisk' => true,
        ],
        'upload' => [
            'disk' => 's3', // 生产环境使用 S3
            'max_file_size' => 10240, // 10MB
            'allowed_extensions' => ['jpg', 'jpeg', 'png', 'pdf'],
            'image_preview' => [
                'enabled' => true,
                'width' => 300,
                'height' => 300,
            ],
        ],
        'editor' => [
            'default' => 'quill',
        ],
        'datetime' => [
            'date_format' => 'YYYY-MM-DD',
            'time_format' => 'HH:mm',
            'locale' => 'zh-CN',
        ],
        'autosave' => [
            'enabled' => true,
            'interval' => 60,
        ],
    ],

    'assets' => [
        'css' => [
            '/css/admin-custom.css',
        ],
        'js' => [
            '/js/admin-custom.js',
        ],
        'cdn' => [
            'enabled' => false,
            'url' => null,
        ],
        'version' => env('XADMIN_ASSET_VERSION', '1.0.0'),
    ],
];
```

## 环境变量

部分配置值可以通过环境变量设置：

```env
# 生产环境禁用注册
XADMIN_REGISTRATION=false

# 资源文件版本号（用于缓存破坏）
XADMIN_ASSET_VERSION=1.0.0

# 启用/禁用调试模式
XADMIN_DEBUG=false
```

## 下一步

- [Grid 组件](/zh/components/grid) - 学习如何构建数据表格
- [Form 组件](/zh/components/form) - 掌握表单构建
- [认证系统](/zh/components/auth) - 自定义认证
