# 快速开始

本教程将指导你在 5 分钟内创建第一个 Grid 和 Form。

## 前提条件

- 已完成 [安装](/zh/guide/installation)
- Laravel 项目已配置好数据库

## 创建你的第一个 Grid

### 步骤 1：准备 Model

假设你已经有一个 `Post` Model：

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'status'];
}
```

### 步骤 2：创建 Grid

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

### 步骤 3：访问

访问 `/posts` 查看数据列表。

## 创建你的第一个 Form

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title')
        ->textarea('content')
        ->select('status', [
            'draft' => 'Draft',
            'published' => 'Published',
        ])
        ->rules('required');
});
```

## 下一步

- [Grid 完整文档](/zh/components/grid)
- [Form 完整文档](/zh/components/form)
- [认证系统](/zh/components/auth)
