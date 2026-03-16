# Grid Component

Grid is the most commonly used component in XAdmin for displaying tabular data. It's built on Livewire v4 and supports sorting, filtering, pagination, and batch actions.

## Basic Usage

### Simplest Grid

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->column('created_at');
```

### Columns with Labels

```php
return XAdmin::grid(Post::class)
    ->column('id', 'ID')
    ->column('title', 'Post Title')
    ->column('status', 'Status')
    ->column('created_at', 'Created At');
```

## Column Definitions

### Basic Columns

Use the `column()` method to add columns. The first parameter is the field name, and the second is the optional display label:

```php
->column('title')           // Label automatically formatted as "Title"
->column('title', 'Title')  // Custom label
```

### Sortable Columns

Use the `sortable()` method to make a column sortable. Note: `sortable()` acts on the **last added column**:

```php
->column('created_at')->sortable()  // created_at column is sortable
```

If you need multiple sortable columns, call it for each column separately:

```php
->column('id')->sortable()
->column('title')->sortable()
->column('created_at')->sortable()
```

### Automatic Label Formatting

If no label is specified, XAdmin will automatically format the field name:

| Field Name | Auto-formatted Label |
|------------|---------------------|
| `created_at` | Created At |
| `user_id` | User Id |
| `post-title` | Post Title |

## Sorting

Grid has built-in column sorting support. Users can click column headers to toggle ascending/descending order:

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')->sortable()
    ->column('title')->sortable()
    ->column('created_at')->sortable();
```

### Default Sorting

You can control default sorting via URL parameters: `?sortField=created_at&sortDirection=desc`

## Filtering

### Adding Filters

Use the `filter()` method to add filter conditions:

```php
$grid = XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->filter('status', 'equal');  // Exact match
```

### Filter Types

| Type | Description | Example |
|------|-------------|---------|
| `equal` | Exact match | `->filter('status', 'equal')` |
| `like` | Fuzzy search | `->filter('title', 'like')` |
| `in` | Contains in array | `->filter('id', 'in')` |
| `between` | Range filter | `->filter('views', 'between')` |
| `date` | Date filter | `->filter('created_at', 'date')` |

### Complete Filter Example

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::grid(Post::class)
    ->column('id')
    ->column('title')
    ->column('status')
    ->column('views')
    ->column('created_at')
    ->filter('title', 'like')        // Title fuzzy search
    ->filter('status', 'equal')      // Status exact match
    ->filter('views', 'between');    // Views range
```

## Pagination

### Setting Page Size

Use the `paginate()` method to set the number of records per page:

```php
->paginate(15)   // 15 per page (default)
->paginate(20)   // 20 per page
->paginate(50)   // 50 per page
```

### Paginator Features

Grid uses Laravel's paginator, supporting:

- Previous/Next navigation
- Page number jump
- Total record count display
- Per-page size switcher

## Search

Grid has built-in global search functionality. Users can enter keywords to search all searchable fields:

```php
// Search fields are automatically inferred from column names
// Excludes id and fields ending with *_id
```

## Batch Actions

### Batch Delete

Grid supports batch selection and deletion of records:

```php
// User interface operations:
// 1. Check records to delete
// 2. Click "Batch Delete" button
```

### Custom Batch Actions

You can listen to batch operations via Livewire events:

```php
// Listen to batch delete event
protected $listeners = ['batch-deleted' => 'handleBatchDeleted'];

public function handleBatchDeleted(int $count): void
{
    $this->dispatch('notify', message: "Deleted {$count} records");
}
```

## Complete Examples

### Post Management Grid

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
            // Define columns
            ->column('id', 'ID')->sortable()
            ->column('title', 'Title')
            ->column('status', 'Status')
            ->column('views', 'Views')->sortable()
            ->column('created_at', 'Created At')

            // Pagination
            ->paginate(20)

            // Filters
            ->filter('title', 'like')
            ->filter('status', 'equal')
            ->filter('views', 'between');
    }
}
```

### User Management Grid

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
            ->column('name', 'Name')
            ->column('email', 'Email')
            ->column('role', 'Role')
            ->column('status', 'Status')
            ->column('created_at', 'Registered At')
            ->paginate(15)
            ->filter('name', 'like')
            ->filter('email', 'like')
            ->filter('role', 'equal')
            ->filter('status', 'equal');
    }
}
```

## API Reference

### GridBuilder Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `column()` | `string $name, ?string $label = null` | `self` | Add column |
| `sortable()` | - | `self` | Make last column sortable |
| `filter()` | `string $field, string $type = 'equal', mixed $value = null` | `self` | Add filter |
| `paginate()` | `int $perPage` | `self` | Set page size |
| `as()` | `string $name` | `self` | Custom Livewire component name |
| `render()` | - | `string` | Render Grid |

### Filter Types

```php
// Exact match
->filter('status', 'equal', 'published')

// Fuzzy search
->filter('title', 'like', 'Laravel')

// Contains in array
->filter('id', 'in', [1, 2, 3])

// Range filter
->filter('views', 'between', [100, 1000])

// Date filter
->filter('created_at', 'date', '2026-03-16')
```

## Next Steps

- [Form Component](/components/form) - Create and edit data
- [Authentication System](/components/auth) - User management and permission control
- [CRUD Tutorial](/examples/crud) - Complete CRUD example
