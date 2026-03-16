# 安装指南

## 系统要求

- PHP 8.3+
- Laravel 12.0+
- Composer

## 步骤 1：安装 XAdmin

使用 Composer 安装：

```bash
composer require x-multibyte/xadmin
```

## 步骤 2：发布资源文件

```bash
php artisan vendor:publish --provider="XAdmin\AdminServiceProvider"
```

## 步骤 3：运行迁移

```bash
php artisan migrate
```

## 步骤 4：创建管理员用户

```bash
php artisan xadmin:create-user
```

## 步骤 5：访问管理面板

访问 `http://your-app.test/admin` 查看 XAdmin 登录页面。

## 下一步

- [快速开始](/zh/guide/quickstart) - 5 分钟内创建你的第一个 Grid
- [配置指南](/zh/guide/configuration) - 详细的配置选项
