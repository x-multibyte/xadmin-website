# Configuration Guide

> **Version Note**: This documentation is for XAdmin 1.x. Configuration options may change in future versions.

XAdmin provides a comprehensive configuration file that allows you to customize various aspects of the admin panel. This guide covers all available configuration options.

## Configuration File Location

After publishing the assets, the configuration file will be located at:

```
config/xadmin.php
```

## Core Configuration Structure

The configuration file is organized into logical sections:

```php
<?php

return [
    // Authentication settings
    'auth' => [...],

    // UI/Theme customization
    'ui' => [...],

    // Grid defaults
    'grid' => [...],

    // Form defaults
    'form' => [...],

    // Asset configuration
    'assets' => [...],
];
```

## Authentication Configuration

Configure how users authenticate with the admin panel.

```php
'auth' => [
    // The authentication guard to use
    'guard' => 'web',

    // The user model class
    'model' => App\Models\User::class,

    // Enable/disable registration
    'registration' => true,

    // Login page settings
    'login' => [
        'path' => '/admin/login',
        'redirect_to' => '/admin',
    ],

    // Password reset settings
    'password_reset' => [
        'enabled' => true,
        'token_expire' => 60, // minutes
    ],
],
```

### Authentication Options Explained

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `guard` | string | `web` | Laravel authentication guard |
| `model` | string | `User::class` | User model for authentication |
| `registration` | boolean | `true` | Allow new user registration |
| `login.path` | string | `/admin/login` | Login route path |
| `login.redirect_to` | string | `/admin` | Post-login redirect URL |
| `password_reset.enabled` | boolean | `true` | Enable password reset feature |
| `password_reset.token_expire` | int | `60` | Reset token validity in minutes |

## UI and Theme Configuration

Customize the visual appearance of the admin panel.

```php
'ui' => [
    // Admin panel title
    'title' => 'XAdmin',

    // Logo configuration
    'logo' => [
        'type' => 'text', // or 'image'
        'value' => 'XAdmin',
        'image_path' => null,
    ],

    // Theme settings
    'theme' => [
        'primary_color' => '#FF2D20',
        'sidebar_collapsed' => false,
        'dark_mode' => [
            'enabled' => true,
            'default' => 'light', // 'light', 'dark', or 'system'
        ],
    ],

    // Layout configuration
    'layout' => [
        'sidebar_width' => '240px',
        'max_content_width' => '1400px',
    ],

    // Footer text
    'footer' => [
        'show_version' => true,
        'custom_text' => null,
    ],
],
```

### Theme Options Explained

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `XAdmin` | Browser title and header text |
| `logo.type` | string | `text` | Logo type: `text` or `image` |
| `logo.value` | string | `XAdmin` | Text logo value |
| `logo.image_path` | string/null | `null` | Path to logo image |
| `theme.primary_color` | string | `#FF2D20` | Primary brand color |
| `theme.sidebar_collapsed` | boolean | `false` | Start with collapsed sidebar |
| `theme.dark_mode.enabled` | boolean | `true` | Enable dark mode toggle |
| `theme.dark_mode.default` | string | `light` | Default color scheme |

## Grid Configuration Defaults

Set default behaviors for data grids across your admin panel.

```php
'grid' => [
    // Pagination settings
    'pagination' => [
        'enabled' => true,
        'per_page' => 15,
        'per_page_options' => [10, 15, 25, 50, 100],
    ],

    // Default actions
    'actions' => [
        'view' => true,
        'edit' => true,
        'delete' => true,
        'bulk_delete' => true,
    ],

    // Filtering options
    'filters' => [
        'enabled' => true,
        'persist_state' => true,
    ],

    // Sorting defaults
    'sorting' => [
        'enabled' => true,
        'default_column' => 'created_at',
        'default_direction' => 'desc',
    ],

    // Export settings
    'export' => [
        'enabled' => true,
        'formats' => ['csv', 'excel', 'pdf'],
    ],
],
```

### Grid Options Explained

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pagination.enabled` | boolean | `true` | Enable pagination |
| `pagination.per_page` | int | `15` | Default items per page |
| `pagination.per_page_options` | array | `[10, 15, 25, 50, 100]` | Available page size options |
| `actions.view` | boolean | `true` | Show view action button |
| `actions.edit` | boolean | `true` | Show edit action button |
| `actions.delete` | boolean | `true` | Show delete action button |
| `actions.bulk_delete` | boolean | `true` | Enable bulk delete |
| `filters.enabled` | boolean | `true` | Enable column filters |
| `filters.persist_state` | boolean | `true` | Save filter state in session |
| `sorting.enabled` | boolean | `true` | Enable column sorting |
| `export.enabled` | boolean | `true` | Enable data export |

## Form Configuration Defaults

Configure default behaviors for forms.

```php
'form' => [
    // Validation display
    'validation' => [
        'display_mode' => 'inline', // 'inline' or 'toast'
        'show_asterisk' => true, // Show * for required fields
    ],

    // File upload defaults
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

    // Rich text editor
    'editor' => [
        'default' => 'quill', // 'quill', 'ckeditor', or 'textarea'
        'quill' => [
            'toolbar' => [
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ],
        ],
    ],

    // Date/Time pickers
    'datetime' => [
        'date_format' => 'YYYY-MM-DD',
        'time_format' => 'HH:mm',
        'locale' => 'en',
    ],

    // Auto-save draft
    'autosave' => [
        'enabled' => false,
        'interval' => 30, // seconds
    ],
],
```

### Form Options Explained

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `validation.display_mode` | string | `inline` | Error display style |
| `validation.show_asterisk` | boolean | `true` | Mark required fields |
| `upload.disk` | string | `public` | Storage disk for uploads |
| `upload.max_file_size` | int | `5120` | Maximum file size in KB |
| `upload.allowed_extensions` | array | `[...]` | Permitted file types |
| `upload.image_preview.enabled` | boolean | `true` | Show image previews |
| `editor.default` | string | `quill` | Default WYSIWYG editor |
| `datetime.date_format` | string | `YYYY-MM-DD` | Date display format |
| `autosave.enabled` | boolean | `false` | Auto-save form drafts |

## Asset Configuration

Control how assets are loaded and cached.

```php
'assets' => [
    // CSS files to include
    'css' => [
        // 'custom.css',
    ],

    // JavaScript files to include
    'js' => [
        // 'custom.js',
    ],

    // CDN configuration (optional)
    'cdn' => [
        'enabled' => false,
        'url' => null,
    ],

    // Version for cache busting
    'version' => '1.0.0',
],
```

## Complete Configuration Example

Here is a complete production-ready configuration:

```php
<?php

return [
    'auth' => [
        'guard' => 'web',
        'model' => App\Models\User::class,
        'registration' => false, // Disable in production
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
        'title' => 'My Admin Panel',
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
            'custom_text' => '© 2026 My Company',
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
            'disk' => 's3', // Use S3 for production
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
            'locale' => 'en',
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

## Environment Variables

Some configuration values can be set via environment variables:

```env
# Disable registration in production
XADMIN_REGISTRATION=false

# Asset versioning for cache busting
XADMIN_ASSET_VERSION=1.0.0

# Enable/disable debug mode
XADMIN_DEBUG=false
```

## Next Steps

- [Grid Component](/components/grid) - Learn how to build data grids
- [Form Component](/components/form) - Master form building
- [Authentication](/components/auth) - Customize authentication
