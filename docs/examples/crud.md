# CRUD实战教程

# CRUD Practical Tutorial

This tutorial will guide you through building a complete content management feature from scratch using XAdmin, including database table creation, list display, create, and edit functionality.

## Prerequisites

- Completed [XAdmin Installation](/guide/installation)
- Laravel project with database configured
- Familiar with basic Laravel development workflow

## Step 1: Create Model and Migration

First, use Laravel's Artisan command to create a `Post` Model and corresponding Migration file:

```bash
php artisan make:model Post -m
```

This will generate two files:

- `app/Models/Post.php` - Model file
- `database/migrations/[timestamp]_create_posts_table.php` - Migration file

### Edit the Migration File

Open the generated Migration file and define the table structure:

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

### Edit the Model File

Open `app/Models/Post.php` and define fillable fields:

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
            self::STATUS_DRAFT => 'Draft',
            self::STATUS_PUBLISHED => 'Published',
        ];
    }
}
```

## Step 2: Run Migration

Execute the Migration to create the database table:

```bash
php artisan migrate
```

If you see the following output, the migration was successful:

```
INFO  Database migrations loaded successfully.
```

### Optional: Add Test Data

You can use Tinker to add some test data:

```bash
php artisan tinker
```

```php
\App\Models\Post::create([
    'title' => 'First Post',
    'content' => 'This is the post content...',
    'status' => 'published',
    'author' => 'Admin',
]);
```

## Step 3: Create Grid (List Page)

Now let's create the post list page. Add the following code to your route file:

### Basic Grid

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts', function () {
    return XAdmin::grid(Post::class)
        ->column('id', 'ID')
        ->column('title', 'Title')
        ->column('status', 'Status')
        ->column('author', 'Author')
        ->column('created_at', 'Created At');
});
```

### Advanced Grid (with Sorting and Pagination)

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts', function () {
    return XAdmin::grid(Post::class)
        ->column('id', 'ID')->sortable()
        ->column('title', 'Title')
        ->column('status', 'Status')
        ->column('author', 'Author')
        ->column('created_at', 'Created At')->sortable()
        ->paginate(20);
});
```

### Complete Grid (with Filters)

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts', function () {
    $grid = XAdmin::grid(Post::class)
        ->column('id', 'ID')->sortable()
        ->column('title', 'Title')
        ->column('status', 'Status')
        ->column('author', 'Author')
        ->column('created_at', 'Created At')->sortable()
        ->paginate(20);

    // Add filters
    $grid->filter(function ($filter) {
        $filter->like('title', 'Title');
        $filter->equal('status', 'Status')
            ->select(Post::getStatusOptions());
        $filter->like('author', 'Author');
    });

    return $grid;
});
```

Visit `http://your-app.test/admin/posts` to see the post list.

## Step 4: Create Form (Create/Edit Form)

Next, create the create and edit forms.

### Create Form

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title', 'Title')
            ->required()
            ->maxLength(255)
        ->textarea('content', 'Content')
            ->required()
            ->rows(10)
        ->select('status', 'Status')
            ->options(Post::getStatusOptions())
            ->default(Post::STATUS_DRAFT)
            ->required()
        ->text('author', 'Author')
            ->maxLength(100);
});
```

### Edit Form

The edit form is similar to the create form. XAdmin will automatically handle data loading and updating:

```php
use XAdmin\XAdmin;
use App\Models\Post;

$post = Post::findOrFail($id);

return XAdmin::form($post)
    ->text('title', 'Title')
        ->required()
        ->maxLength(255)
    ->textarea('content', 'Content')
        ->required()
        ->rows(10)
    ->select('status', 'Status')
        ->options(Post::getStatusOptions())
        ->required()
    ->text('author', 'Author')
        ->maxLength(100);
});
```

### Complete Form (with Validation Rules)

```php
use XAdmin\XAdmin;
use App\Models\Post;

Route::get('/admin/posts/create', function () {
    return XAdmin::form(Post::class)
        ->text('title', 'Title')
            ->rules('required|string|max:255')
            ->placeholder('Enter post title')
        ->textarea('content', 'Content')
            ->rules('required|string')
            ->placeholder('Enter post content')
        ->select('status', 'Status')
            ->options(Post::getStatusOptions())
            ->default(Post::STATUS_DRAFT)
            ->rules('required|in:draft,published')
        ->text('author', 'Author')
            ->rules('nullable|string|max:100')
            ->placeholder('Author name');
});
```

## Complete Route Example

Integrate the above code into your route file:

```php
<?php

use Illuminate\Support\Facades\Route;
use XAdmin\XAdmin;
use App\Models\Post;

Route::prefix('admin')->group(function () {
    // Post list
    Route::get('/posts', function () {
        $grid = XAdmin::grid(Post::class)
            ->column('id', 'ID')->sortable()
            ->column('title', 'Title')
            ->column('status', 'Status')
            ->column('author', 'Author')
            ->column('created_at', 'Created At')->sortable()
            ->paginate(20);

        $grid->filter(function ($filter) {
            $filter->like('title', 'Title');
            $filter->equal('status', 'Status')
                ->select(Post::getStatusOptions());
            $filter->like('author', 'Author');
        });

        return $grid;
    });

    // Create post
    Route::get('/posts/create', function () {
        return XAdmin::form(Post::class)
            ->text('title', 'Title')
                ->rules('required|string|max:255')
            ->textarea('content', 'Content')
                ->rules('required|string')
            ->select('status', 'Status')
                ->options(Post::getStatusOptions())
                ->default(Post::STATUS_DRAFT)
                ->rules('required|in:draft,published')
            ->text('author', 'Author')
                ->rules('nullable|string|max:100');
    });

    // Edit post
    Route::get('/posts/{id}/edit', function ($id) {
        $post = Post::findOrFail($id);

        return XAdmin::form($post)
            ->text('title', 'Title')
                ->rules('required|string|max:255')
            ->textarea('content', 'Content')
                ->rules('required|string')
            ->select('status', 'Status')
                ->options(Post::getStatusOptions())
                ->rules('required|in:draft,published')
            ->text('author', 'Author')
                ->rules('nullable|string|max:100');
    });
});
```

## Next Steps

After completing this tutorial, you can continue learning:

- [Grid Component Complete Documentation](/components/grid) - Learn more Grid features
- [Form Component Complete Documentation](/components/form) - Deep dive into Form validation and file uploads
- [Authentication System](/components/auth) - Configure user permission management

## Frequently Asked Questions

### Q: How to handle file uploads?

Use `image()` or `file()` field types:

```php
->image('featured_image', 'Featured Image')
    ->rules('image|max:2048')
```

### Q: How to add batch actions?

Use Grid's batch action functionality:

```php
$grid->batchAction(function ($batch) {
    $batch->delete('Delete Selected');
});
```

### Q: How to customize column display format?

Use the column's `display()` method:

```php
->column('status', 'Status')
    ->display(function ($value) {
        return $value === 'published'
            ? '<span class="text-green-600">Published</span>'
            : '<span class="text-gray-600">Draft</span>';
    })
```
