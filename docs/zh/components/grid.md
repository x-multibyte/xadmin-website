# Grid 组件

Grid 是 XAdmin 中最常用的组件，用于显示表格数据。它基于 Livewire v4 构建，支持排序、过滤、分页和批量操作。

## 基本用法

### 最简单的 Grid

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->column('created_at');
```

### 带标签的列

```php
return XAdmin::grid(Post::class)
    ->column('id', 'ID')
    ->column('title', '文章标题')
    ->column('status', '状态')
    ->column('created_at', '创建时间');
```

## 列定义

### 基本列

使用 `column()` 方法添加列。第一个参数是字段名，第二个是可选的显示标签：

```php
->column('title')           // 标签自动格式化为 "Title"
->column('title', '标题')   // 自定义标签
```

### 可排序的列

使用 `sortable()` 方法使列可排序。注意：`sortable()` 作用于**最后添加的列**：

```php
->column('created_at')->sortable()  // created_at 列可排序
```

如果需要多个可排序列，分别调用：

```php
->column('id')->sortable()
->column('title')->sortable()
->column('created_at')->sortable()
```

### 自动标签格式化

如果未指定标签，XAdmin 会自动格式化字段名：

| 字段名 | 自动格式化标签 |
|--------|---------------|
| `created_at` | Created At |
| `user_id` | User Id |
| `post-title` | Post Title |

## 排序

Grid 内置了列排序支持。用户可以点击列标题切换升序/降序：

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')->sortable()
    ->column('title')->sortable()
    ->column('created_at')->sortable();
```

### 默认排序

你可以通过 URL 参数控制默认排序：`?sortField=created_at&sortDirection=desc`

## 过滤

### 添加过滤器

使用 `filter()` 方法添加过滤条件：

```php
$grid = XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->filter('status', 'equal');  // 精确匹配
```

### 过滤器类型

| 类型 | 描述 | 示例 |
|------|------|------|
| `equal` | 精确匹配 | `->filter('status', 'equal')` |
| `like` | 模糊搜索 | `->filter('title', 'like')` |
| `in` | 数组包含 | `->filter('id', 'in')` |
| `between` | 范围过滤 | `->filter('views', 'between')` |
| `date` | 日期过滤 | `->filter('created_at', 'date')` |

### 完整过滤示例

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->column('views')
    ->column('created_at')
    ->filter('title', 'like')        // 标题模糊搜索
    ->filter('status', 'equal')      // 状态精确匹配
    ->filter('views', 'between');    // 浏览量范围
```

## 分页

### 设置每页数量

使用 `paginate()` 方法设置每页记录数：

```php
->paginate(15)   // 每页 15 条（默认）
->paginate(20)   // 每页 20 条
->paginate(50)   // 每页 50 条
```

### 分页器功能

Grid 使用 Laravel 的分页器，支持：

- 上一页/下一页导航
- 页码跳转
- 总记录数显示
- 每页大小切换器

## 搜索

Grid 内置全局搜索功能。用户可以输入关键词搜索所有可搜索字段：

```php
// 搜索字段自动从列名推断
// 排除 id 和以 *_id 结尾的字段
```

## 批量操作

### 批量删除

Grid 支持批量选择和删除记录：

```php
// 用户界面操作：
// 1. 勾选要删除的记录
// 2. 点击"批量删除"按钮
```

### 自定义批量操作

你可以通过 Livewire 事件监听批量操作：

```php
// 监听批量删除事件
protected $listeners = ['batch-deleted' => 'handleBatchDeleted'];

public function handleBatchDeleted(int $count): void
{
    $this->dispatch('notify', message: "已删除 {$count} 条记录");
}
```

## 完整示例

### 文章管理 Grid

```php
<?php

namespace App\Livewire\Admin\Posts;

use XAdmin\XAdmin;
use App\Models\Post;

class PostGrid
{
    public function index()
    {
        return XAdmin::grid(Post::class)
            // 定义列
            ->column('id', 'ID')->sortable()
            ->column('title', '标题')
            ->column('status', '状态')
            ->column('views', '浏览量')->sortable()
            ->column('created_at', '创建时间')

            // 分页
            ->paginate(20)

            // 过滤器
            ->filter('title', 'like')
            ->filter('status', 'equal')
            ->filter('views', 'between');
    }
}
```

### 用户管理 Grid

```php
<?php

namespace App\Livewire\Admin\Users;

use XAdmin\XAdmin;
use App\Models\User;

class UserGrid
{
    public function index()
    {
        return XAdmin::grid(User::class)
            ->column('id', 'ID')->sortable()
            ->column('name', '姓名')
            ->column('email', '邮箱')
            ->column('role', '角色')
            ->column('status', '状态')
            ->column('created_at', '注册时间')
            ->paginate(15)
            ->filter('name', 'like')
            ->filter('email', 'like')
            ->filter('role', 'equal')
            ->filter('status', 'equal');
    }
}
```

## API 参考

### GridBuilder 方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `column()` | `string $name, ?string $label = null` | `self` | 添加列 |
| `sortable()` | - | `self` | 使最后添加的列可排序 |
| `filter()` | `string $field, string $type = 'equal', mixed $value = null` | `self` | 添加过滤器 |
| `paginate()` | `int $perPage` | `self` | 设置每页数量 |
| `as()` | `string $name` | `self` | 自定义 Livewire 组件名 |
| `render()` | - | `string` | 渲染 Grid |

### 过滤器类型

```php
// 精确匹配
->filter('status', 'equal', 'published')

// 模糊搜索
->filter('title', 'like', 'Laravel')

// 数组包含
->filter('id', 'in', [1, 2, 3])

// 范围过滤
->filter('views', 'between', [100, 1000])

// 日期过滤
->filter('created_at', 'date', '2026-03-16')
```

## 下一步

- [Form 组件](/zh/components/form) - 创建和编辑数据
- [认证系统](/zh/components/auth) - 用户管理和权限控制
- [CRUD 教程](/zh/examples/crud) - 完整的 CRUD 示例
