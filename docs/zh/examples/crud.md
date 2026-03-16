# CRUD 实战教程

本教程将指导你从零开始使用 XAdmin 构建完整的内容管理功能，包括数据库表创建、列表展示、创建和编辑功能。

## 前提条件

- 已完成 [XAdmin 安装](/zh/guide/installation)
- Laravel 项目已配置好数据库
- 熟悉基本的 Laravel 开发流程

## 步骤 1：创建 Model 和 Migration

首先，使用 Laravel 的 Artisan 命令创建 `Post` Model 和对应的 Migration 文件：

```bash
php artisan make:model Post -m
```

这将生成两个文件：

- `app/Models/Post.php` - Model 文件
- `database/migrations/[timestamp]_create_posts_table.php` - Migration 文件

### 编辑 Migration 文件

打开生成的 Migration 文件，定义表结构：

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('status')->default('draft');
            $table->string('author')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

### 编辑 Model 文件

打开 `app/Models/Post.php`，定义可填充字段：

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'status',
        'author',
    ];

    /**
     * Status constants
     */
    const STATUS_DRAFT = 'draft';
    const STATUS_PUBLISHED = 'published';

    /**
     * Get available statuses
     *
     * @return array
     */
    public static function getStatusOptions(): array
    {
        return [
            self::STATUS_DRAFT => '草稿',
            self::STATUS_PUBLISHED => '已发布',
        ];
    }
}
```

## 步骤 2：运行 Migration

执行 Migration 创建数据库表：

```bash
php artisan migrate
```

如果看到以下输出，说明迁移成功：

```
INFO  Database migrations loaded successfully.
```

### 可选：添加测试数据

你可以使用 Tinker 添加一些测试数据：

```bash
php artisan tinker
```

```php
\App\Models\Post::create([
    'title' => '第一篇文章',
    'content' => '这是文章内容...',
    'status' => 'published',
    'author' => '管理员',
]);
```

## 步骤 3：创建 Grid（列表页面）

现在让我们创建文章列表页面。在路由文件中添加以下代码：

### 基础 Grid

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts', function () {
    return XAdmin::grid(Post::class)
        ->column('id', 'ID')
        ->column('title', '标题')
        ->column('status', '状态')
        ->column('author', '作者')
        ->column('created_at', '创建时间');
});
```

### 高级 Grid（带排序和分页）

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts', function () {
    return XAdmin::grid(Post::class)
        ->column('id', 'ID')->sortable()
        ->column('title', '标题')
        ->column('status', '状态')
        ->column('author', '作者')
        ->column('created_at', '创建时间')->sortable()
        ->paginate(20);
});
```

### 完整 Grid（带过滤器）

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts', function () {
    $grid = XAdmin::grid(Post::class)
        ->column('id', 'ID')->sortable()
        ->column('title', '标题')
        ->column('status', '状态')
        ->column('author', '作者')
        ->column('created_at', '创建时间')->sortable()
        ->paginate(20);

    // 添加过滤器
    $grid->filter(function ($filter) {
        $filter->like('title', '标题');
        $filter->equal('status', '状态')
            ->select(Post::getStatusOptions());
        $filter->like('author', '作者');
    });

    return $grid;
});
```

访问 `http://your-app.test/admin/posts` 查看文章列表。

## 步骤 4：创建 Form（创建/编辑表单）

接下来，创建创建和编辑表单。

### 创建表单

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title', '标题')
            ->required()
            ->maxLength(255)
        ->textarea('content', '内容')
            ->required()
            ->rows(10)
        ->select('status', '状态')
            ->options(Post::getStatusOptions())
            ->default(Post::STATUS_DRAFT)
            ->required()
        ->text('author', '作者')
            ->maxLength(100);
});
```

### 编辑表单

编辑表单与创建表单类似。XAdmin 会自动处理数据加载和更新：

```php
use XAdmin\XAdmin;
use App\Models\Post;

$post = Post::findOrFail($id);

return XAdmin::form($post)
    ->text('title', '标题')
        ->required()
        ->maxLength(255)
    ->textarea('content', '内容')
        ->required()
        ->rows(10)
    ->select('status', '状态')
        ->options(Post::getStatusOptions())
        ->required()
    ->text('author', '作者')
        ->maxLength(100);
});
```

### 完整表单（带验证规则）

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title', '标题')
            ->rules('required|string|max:255')
            ->placeholder('请输入文章标题')
        ->textarea('content', '内容')
            ->rules('required|string')
            ->placeholder('请输入文章内容')
        ->select('status', '状态')
            ->options(Post::getStatusOptions())
            ->default(Post::STATUS_DRAFT)
            ->rules('required|in:draft,published')
        ->text('author', '作者')
            ->rules('nullable|string|max:100')
            ->placeholder('作者名称');
});
```

## 完整路由示例

将上述代码整合到你的路由文件中：

```php
<?php

use Illuminate\Support\Facades\Route;
use XAdmin\XAdmin;
use App\Models\Post;

Route::prefix('admin')->group(function () {
    // 文章列表
    Route::get('/posts', function () {
        $grid = XAdmin::grid(Post::class)
            ->column('id', 'ID')->sortable()
            ->column('title', '标题')
            ->column('status', '状态')
            ->column('author', '作者')
            ->column('created_at', '创建时间')->sortable()
            ->paginate(20);

        $grid->filter(function ($filter) {
            $filter->like('title', '标题');
            $filter->equal('status', '状态')
                ->select(Post::getStatusOptions());
            $filter->like('author', '作者');
        });

        return $grid;
    });

    // 创建文章
    Route::get('/posts/create', function () {
        return XAdmin::form(Post::class)
            ->text('title', '标题')
                ->rules('required|string|max:255')
            ->textarea('content', '内容')
                ->rules('required|string')
            ->select('status', '状态')
                ->options(Post::getStatusOptions())
                ->default(Post::STATUS_DRAFT)
                ->rules('required|in:draft,published')
            ->text('author', '作者')
                ->rules('nullable|string|max:100');
    });

    // 编辑文章
    Route::get('/posts/{id}/edit', function ($id) {
        $post = Post::findOrFail($id);

        return XAdmin::form($post)
            ->text('title', '标题')
                ->rules('required|string|max:255')
            ->textarea('content', '内容')
                ->rules('required|string')
            ->select('status', '状态')
                ->options(Post::getStatusOptions())
                ->rules('required|in:draft,published')
            ->text('author', '作者')
                ->rules('nullable|string|max:100');
    });
});
```

## 下一步

完成本教程后，你可以继续学习：

- [Grid 组件完整文档](/zh/components/grid) - 学习更多 Grid 功能
- [Form 组件完整文档](/zh/components/form) - 深入了解 Form 验证和文件上传
- [认证系统](/zh/components/auth) - 配置用户权限管理

## 常见问题

### Q: 如何处理文件上传？

使用 `image()` 或 `file()` 字段类型：

```php
->image('featured_image', '封面图片')
    ->rules('image|max:2048')
```

### Q: 如何添加批量操作？

使用 Grid 的批量操作功能：

```php
$grid->batchAction(function ($batch) {
    $batch->delete('删除选中');
});
```

### Q: 如何自定义列显示格式？

使用列的 `display()` 方法：

```php
->column('status', '状态')
    ->display(function ($value) {
        return $value === 'published'
            ? '<span class="text-green-600">已发布</span>'
            : '<span class="text-gray-600">草稿</span>';
    })
```
