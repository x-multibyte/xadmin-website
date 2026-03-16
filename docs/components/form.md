# Form Component

The Form component is used to create and edit data records. It's built on Livewire v4 and supports real-time validation, file uploads, and conditional display.

## Basic Usage

### Create Form (New Record)

```php
use XAdmin\XAdmin;
use App\Models\Post;

return XAdmin::form(Post::class)
    ->text('title')
    ->textarea('content')
    ->select('status', [
        'draft' => 'Draft',
        'published' => 'Published',
    ]);
```

### Edit Form

```php
use XAdmin\XAdmin;
use App\Models\Post;

$post = Post::find(1);

return XAdmin::form(Post::class, $post->id)
    ->text('title')
    ->textarea('content')
    ->select('status', [
        'draft' => 'Draft',
        'published' => 'Published',
    ]);
```

## Field Types

### Text Input

```php
// Single line text
->text('title')

// Multi-line text
->textarea('content')

// Email
->email('email')

// Password
->password('password')

// Number
->number('views')
```

### Selectors

```php
// Dropdown select
->select('status', [
    'draft' => 'Draft',
    'published' => 'Published',
])

// Checkbox (multiple select)
->checkbox('tags', [
    'laravel' => 'Laravel',
    'php' => 'PHP',
    'javascript' => 'JavaScript',
])

// Radio buttons
->radio('type', [
    'article' => 'Article',
    'page' => 'Page',
])
```

### Date and Time

```php
// Date picker
->date('published_date')

// Date and time picker
->datetime('scheduled_at')
```

### Switch

```php
->switch('is_featured')
```

### File Upload

```php
// Single file upload
->file('document')

// Image upload
->image('avatar')

// Multiple file upload
->multipleFile('attachments')
```

## Custom Storage Path

File upload fields can specify storage path and disk:

```php
// Image upload to storage/app/public/avatars
->image('avatar', 'Avatar', 'avatars', 'public')

// File upload to storage/app/public/documents
->file('document', 'Document', 'documents', 'public')

// Multiple file upload
->multipleFile('attachments', 'Attachments', 'attachments', 'public')
```

**Parameter Description:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `$name` | - | Field name |
| `$label` | `null` | Display label (optional) |
| `$storagePath` | `'uploads'` | Storage subdirectory |
| `$disk` | `'public'` | Filesystem disk |

## Validation

### Using rules() Method

```php
->text('email')
    ->rules('required|email')

->text('title')
    ->rules('required|min:5|max:200')

->image('avatar')
    ->rules('required|image|max:2048')
```

### Using required() Method

```php
->text('title')
    ->required()  // Equivalent to ->rules('required')

->textarea('content')
    ->required()
```

### Common Validation Rules

```php
// Required
->rules('required')

// Email format
->rules('email')

// Minimum length
->rules('min:5')

// Maximum length
->rules('max:200')

// Numeric
->rules('numeric')

// URL format
->rules('url')

// Uniqueness check
->rules('unique:posts')

// Image validation
->rules('image|mimes:jpeg,png,gif|max:2048')

// File validation
->rules('file|mimes:pdf,doc,docx|max:5120')
```

### Array Format Rules

```php
->text('email')
    ->rules(['required', 'email', 'unique:users'])
```

## File Upload

### Image Upload

```php
->image('avatar')
    ->rules('image|max:2048')  // Max 2MB
```

### File Upload

```php
->file('document')
    ->rules('file|max:5120')  // Max 5MB
```

### Multiple File Upload

```php
->multipleFile('attachments')
    ->rules('file|max:2048')
```

### File Upload Security Configuration

```php
// Limit file types and size
->image('avatar', 'Avatar', 'avatars', 'public')
    ->rules('image|mimes:jpeg,png,gif,webp|max:2048')
```

## Field Labels

### Automatic Formatting

If no label is specified, XAdmin will automatically format the field name:

```php
->text('user_name')     // Label: User Name
->text('email')         // Label: Email
->text('created-at')    // Label: Created At
```

### Custom Labels

```php
->text('title', 'Post Title')
->email('email', 'Contact Email')
```

## Complete Examples

### Post Creation Form

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
            // Basic fields
            ->text('title', 'Title')
                ->required()
                ->rules('min:5|max:200')

            ->textarea('content', 'Content')
                ->required()
                ->rules('min:10')

            // Selector
            ->select('status', [
                'draft' => 'Draft',
                'published' => 'Published',
                'archived' => 'Archived',
            ], 'Status')
                ->required()

            // Number field
            ->number('views', 'Views')
                ->rules('numeric|min:0')

            // Date field
            ->date('published_date', 'Published Date')

            // Image upload
            ->image('featured_image', 'Cover Image', 'posts/covers')
                ->rules('image|mimes:jpeg,png,gif,webp|max:2048')

            // Switch
            ->switch('is_featured', 'Featured');
    }

    public function edit(int $id)
    {
        return XAdmin::form(Post::class, $id)
            ->text('title', 'Title')
                ->required()
            ->textarea('content', 'Content')
                ->required()
            ->select('status', [
                'draft' => 'Draft',
                'published' => 'Published',
                'archived' => 'Archived',
            ], 'Status')
            ->image('featured_image', 'Cover Image', 'posts/covers')
            ->switch('is_featured', 'Featured');
    }
}
```

### User Management Form

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
            ->text('name', 'Name')
                ->required()
                ->rules('min:2|max:50')

            ->email('email', 'Email')
                ->required()
                ->rules('email|unique:users')

            ->password('password', 'Password')
                ->required()
                ->rules('min:8|confirmed')

            ->password('password_confirmation', 'Confirm Password')
                ->required()

            ->select('role', [
                'admin' => 'Admin',
                'editor' => 'Editor',
                'user' => 'User',
            ], 'Role')
                ->required()

            ->switch('is_active', 'Active Status');
    }

    public function edit(int $id)
    {
        return XAdmin::form(User::class, $id)
            ->text('name', 'Name')
                ->required()
            ->email('email', 'Email')
                ->required()
            ->select('role', [
                'admin' => 'Admin',
                'editor' => 'Editor',
                'user' => 'User',
            ], 'Role')
            ->switch('is_active', 'Active Status');
    }
}
```

### Product Management Form (with Multiple File Upload)

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
            ->text('name', 'Product Name')
                ->required()

            ->textarea('description', 'Product Description')
                ->required()

            ->number('price', 'Price')
                ->required()
                ->rules('numeric|min:0')

            // Main image
            ->image('main_image', 'Main Image', 'products/images')
                ->required()
                ->rules('image|mimes:jpeg,png,webp|max:2048')

            // Multiple image upload
            ->multipleFile('gallery', 'Product Gallery', 'products/gallery')
                ->rules('image|mimes:jpeg,png,webp|max:1024')

            // Document attachment
            ->file('manual', 'User Manual', 'products/manuals')
                ->rules('file|mimes:pdf,doc,docx|max:5120')

            ->switch('is_available', 'Available');
    }
}
```

## API Reference

### FormBuilder Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `text()` | `string $name, ?string $label = null` | `self` | Text input field |
| `textarea()` | `string $name, ?string $label = null` | `self` | Multi-line text field |
| `email()` | `string $name, ?string $label = null` | `self` | Email input field |
| `password()` | `string $name, ?string $label = null` | `self` | Password input field |
| `number()` | `string $name, ?string $label = null` | `self` | Number input field |
| `select()` | `string $name, array $options, ?string $label = null` | `self` | Dropdown select field |
| `checkbox()` | `string $name, array $options, ?string $label = null` | `self` | Checkbox field |
| `radio()` | `string $name, array $options, ?string $label = null` | `self` | Radio button field |
| `date()` | `string $name, ?string $label = null` | `self` | Date picker |
| `datetime()` | `string $name, ?string $label = null` | `self` | Date and time picker |
| `switch()` | `string $name, ?string $label = null` | `self` | Switch toggle |
| `file()` | `string $name, ?string $label = null, string $storagePath = 'uploads', string $disk = 'public'` | `self` | File upload |
| `image()` | `string $name, ?string $label = null, string $storagePath = 'uploads', string $disk = 'public'` | `self` | Image upload |
| `multipleFile()` | `string $name, ?string $label = null, string $storagePath = 'uploads', string $disk = 'public'` | `self` | Multiple file upload |
| `rules()` | `string\|array $rules` | `self` | Set validation rules (acts on last field) |
| `required()` | - | `self` | Set as required (acts on last field) |
| `as()` | `string $name` | `self` | Custom Livewire component name |
| `render()` | - | `string` | Render Form |

## Real-time Validation

The Form component supports real-time validation, automatically validating as users type:

```php
// Automatically validates as user types
->text('email')
    ->rules('required|email')
```

Validation errors are displayed in real-time below the field.

## Next Steps

- [Grid Component](/components/grid) - Data table display
- [Authentication System](/components/auth) - User management and permission control
- [CRUD Tutorial](/examples/crud) - Complete CRUD example
