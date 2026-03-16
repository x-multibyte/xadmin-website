# Installation Guide

## System Requirements

- PHP 8.3+
- Laravel 12.0+
- Composer

## Step 1: Install XAdmin

Install via Composer:

```bash
composer require x-multibyte/xadmin
```

## Step 2: Publish Assets

```bash
php artisan vendor:publish --provider="XAdmin\AdminServiceProvider"
```

## Step 3: Run Migrations

```bash
php artisan migrate
```

## Step 4: Create Admin User

```bash
php artisan xadmin:create-user
```

## Step 5: Access the Admin Panel

Visit `http://your-app.test/admin` to see the XAdmin login page.

## Next Steps

- [Quick Start](/guide/quickstart) - Create your first Grid in 5 minutes
- [Configuration Guide](/guide/configuration) - Detailed configuration options
