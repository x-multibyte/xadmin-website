# Quick Start

This tutorial will guide you through creating your first Grid and Form in 5 minutes.

## Prerequisites

- Completed [Installation](/guide/installation)
- Laravel project with database configured

## Create Your First Grid

### Step 1: Prepare the Model

Assuming you already have a `Post` Model:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'status'];
}
```

### Step 2: Create a Grid

Define it in your route file:

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

### Step 3: Access

Visit `/posts` to see the data list.

## Create Your First Form

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

## Next Steps

- [Grid Complete Documentation](/components/grid)
- [Form Complete Documentation](/components/form)
- [Authentication System](/components/auth)
