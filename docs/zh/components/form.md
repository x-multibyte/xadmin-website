# Form 组件

Form 组件用于创建和编辑数据记录。它基于 Livewire v4 构建，支持实时验证、文件上传和条件显示。

## 基本用法

### 创建表单（新建记录）

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

### 编辑表单

```php
use XAdmin\XAdmin;
use App\Models\Post;

$post = Post::find(1);

return XAdmin::form(Post::class, $post->id)
    ->text('title')
    ->textarea('content')
    ->select('status', [
        'draft' => '草稿',
        'published' => '已发布',
    ]);
```

## 字段类型

### 文本输入

```php
// 单行文本
->text('title')

// 多行文本
->textarea('content')

// 邮箱
->email('email')

// 密码
->password('password')

// 数字
->number('views')
```

### 选择器

```php
// 下拉选择
->select('status', [
    'draft' => '草稿',
    'published' => '已发布',
])

// 复选框（多选）
->checkbox('tags', [
    'laravel' => 'Laravel',
    'php' => 'PHP',
    'javascript' => 'JavaScript',
])

// 单选按钮
->radio('type', [
    'article' => '文章',
    'page' => '页面',
])
```

### 日期和时间

```php
// 日期选择器
->date('published_date')

// 日期和时间选择器
->datetime('scheduled_at')
```

### 开关

```php
->switch('is_featured')
```

### 文件上传

```php
// 单个文件上传
->file('document')

// 图片上传
->image('avatar')

// 多个文件上传
->multipleFile('attachments')
```

## 自定义存储路径

文件上传字段可以指定存储路径和磁盘：

```php
// 图片上传到 storage/app/public/avatars
->image('avatar', '头像', 'avatars', 'public')

// 文件上传到 storage/app/public/documents
->file('document', '文档', 'documents', 'public')

// 多个文件上传
->multipleFile('attachments', '附件', 'attachments', 'public')
```

**参数说明：**

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `$name` | - | 字段名 |
| `$label` | `null` | 显示标签（可选） |
| `$storagePath` | `'uploads'` | 存储子目录 |
| `$disk` | `'public'` | 文件系统磁盘 |

## 验证

### 使用 rules() 方法

```php
->text('email')
    ->rules('required|email')

->text('title')
    ->rules('required|min:5|max:200')

->image('avatar')
    ->rules('required|image|max:2048')
```

### 使用 required() 方法

```php
->text('title')
    ->required()  // 相当于 ->rules('required')

->textarea('content')
    ->required()
```

### 常用验证规则

```php
// 必填
->rules('required')

// 邮箱格式
->rules('email')

// 最小长度
->rules('min:5')

// 最大长度
->rules('max:200')

// 数字
->rules('numeric')

// URL 格式
->rules('url')

// 唯一性检查
->rules('unique:posts')

// 图片验证
->rules('image|mimes:jpeg,png,gif|max:2048')

// 文件验证
->rules('file|mimes:pdf,doc,docx|max:5120')
```

### 数组格式规则

```php
->text('email')
    ->rules(['required', 'email', 'unique:users'])
```

## 文件上传

### 图片上传

```php
->image('avatar')
    ->rules('image|max:2048')  // 最大 2MB
```

### 文件上传

```php
->file('document')
    ->rules('file|max:5120')  // 最大 5MB
```

### 多个文件上传

```php
->multipleFile('attachments')
    ->rules('file|max:2048')
```

### 文件上传安全配置

```php
// 限制文件类型和大小
->image('avatar', '头像', 'avatars', 'public')
    ->rules('image|mimes:jpeg,png,gif,webp|max:2048')
```

## 字段标签

### 自动格式化

如果未指定标签，XAdmin 会自动格式化字段名：

```php
->text('user_name')     // 标签：User Name
->text('email')         // 标签：Email
->text('created-at')    // 标签：Created At
```

### 自定义标签

```php
->text('title', '文章标题')
->email('email', '联系邮箱')
```

## 完整示例

### 文章创建表单

```php
<?php

namespace App\Livewire\Admin\Posts;

use XAdmin\XAdmin;
use App\Models\Post;

class PostForm
{
    public function create()
    {
        return XAdmin::form(Post::class)
            // 基本字段
            ->text('title', '标题')
                ->required()
                ->rules('min:5|max:200')

            ->textarea('content', '内容')
                ->required()
                ->rules('min:10')

            // 选择器
            ->select('status', [
                'draft' => '草稿',
                'published' => '已发布',
                'archived' => '已归档',
            ], '状态')
                ->required()

            // 数字字段
            ->number('views', '浏览量')
                ->rules('numeric|min:0')

            // 日期字段
            ->date('published_date', '发布日期')

            // 图片上传
            ->image('featured_image', '封面图片', 'posts/covers')
                ->rules('image|mimes:jpeg,png,gif,webp|max:2048')

            // 开关
            ->switch('is_featured', '推荐');
    }

    public function edit(int $id)
    {
        return XAdmin::form(Post::class, $id)
            ->text('title', '标题')
                ->required()
            ->textarea('content', '内容')
                ->required()
            ->select('status', [
                'draft' => '草稿',
                'published' => '已发布',
                'archived' => '已归档',
            ], '状态')
            ->image('featured_image', '封面图片', 'posts/covers')
            ->switch('is_featured', '推荐');
    }
}
```

### 用户管理表单

```php
<?php

namespace App\Livewire\Admin\Users;

use XAdmin\XAdmin;
use App\Models\User;

class UserForm
{
    public function create()
    {
        return XAdmin::form(User::class)
            ->text('name', '姓名')
                ->required()
                ->rules('min:2|max:50')

            ->email('email', '邮箱')
                ->required()
                ->rules('email|unique:users')

            ->password('password', '密码')
                ->required()
                ->rules('min:8|confirmed')

            ->password('password_confirmation', '确认密码')
                ->required()

            ->select('role', [
                'admin' => '管理员',
                'editor' => '编辑',
                'user' => '用户',
            ], '角色')
                ->required()

            ->switch('is_active', '激活状态');
    }

    public function edit(int $id)
    {
        return XAdmin::form(User::class, $id)
            ->text('name', '姓名')
                ->required()
            ->email('email', '邮箱')
                ->required()
            ->select('role', [
                'admin' => '管理员',
                'editor' => '编辑',
                'user' => '用户',
            ], '角色')
            ->switch('is_active', '激活状态');
    }
}
```

### 产品管理表单（带多文件上传）

```php
<?php

namespace App\Livewire\Admin\Products;

use XAdmin\XAdmin;
use App\Models\Product;

class ProductForm
{
    public function create()
    {
        return XAdmin::form(Product::class)
            ->text('name', '产品名称')
                ->required()

            ->textarea('description', '产品描述')
                ->required()

            ->number('price', '价格')
                ->required()
                ->rules('numeric|min:0')

            // 主图
            ->image('main_image', '主图', 'products/images')
                ->required()
                ->rules('image|mimes:jpeg,png,webp|max:2048')

            // 多图片上传
            ->multipleFile('gallery', '产品相册', 'products/gallery')
                ->rules('image|mimes:jpeg,png,webp|max:1024')

            // 文档附件
            ->file('manual', '用户手册', 'products/manuals')
                ->rules('file|mimes:pdf,doc,docx|max:5120')

            ->switch('is_available', '可售');
    }
}
```

## API 参考

### FormBuilder 方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `text()` | `string $name, ?string $label = null` | `self` | 文本输入字段 |
| `textarea()` | `string $name, ?string $label = null` | `self` | 多行文本字段 |
| `email()` | `string $name, ?string $label = null` | `self` | 邮箱输入字段 |
| `password()` | `string $name, ?string $label = null` | `self` | 密码输入字段 |
| `number()` | `string $name, ?string $label = null` | `self` | 数字输入字段 |
| `select()` | `string $name, array $options, ?string $label = null` | `self` | 下拉选择字段 |
| `checkbox()` | `string $name, array $options, ?string $label = null` | `self` | 复选框字段 |
| `radio()` | `string $name, array $options, ?string $label = null` | `self` | 单选按钮字段 |
| `date()` | `string $name, ?string $label = null` | `self` | 日期选择器 |
| `datetime()` | `string $name, ?string $label = null` | `self` | 日期和时间选择器 |
| `switch()` | `string $name, ?string $label = null` | `self` | 开关切换 |
| `file()` | `string $name, ?string $label = null, string $storagePath = 'uploads', string $disk = 'public'` | `self` | 文件上传 |
| `image()` | `string $name, ?string $label = null, string $storagePath = 'uploads', string $disk = 'public'` | `self` | 图片上传 |
| `multipleFile()` | `string $name, ?string $label = null, string $storagePath = 'uploads', string $disk = 'public'` | `self` | 多文件上传 |
| `rules()` | `string\|array $rules` | `self` | 设置验证规则（作用于最后字段） |
| `required()` | - | `self` | 设置为必填（作用于最后字段） |
| `as()` | `string $name` | `self` | 自定义 Livewire 组件名 |
| `render()` | - | `string` | 渲染 Form |

## 实时验证

Form 组件支持实时验证，在用户输入时自动验证：

```php
// 用户输入时自动验证
->text('email')
    ->rules('required|email')
```

验证错误会实时显示在字段下方。

## 下一步

- [Grid 组件](/zh/components/grid) - 数据表格显示
- [认证系统](/zh/components/auth) - 用户管理和权限控制
- [CRUD 教程](/zh/examples/crud) - 完整的 CRUD 示例
