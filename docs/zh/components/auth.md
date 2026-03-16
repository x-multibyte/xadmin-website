# 认证系统

XAdmin 提供完整的认证和授权系统，包括用户登录、权限控制、角色管理和审计日志。

## 认证中间件

所有管理面板路由都自动受到认证中间件保护。未认证的用户将被重定向到登录页面。

### 中间件配置

在 `config/admin.php` 中配置认证中间件：

```php
'route' => [
    'prefix' => 'admin',
    'middleware' => [
        'admin.auth',      // 认证检查
        'admin.permission', // 权限验证
        'admin.session',    // 会话管理
    ],
],
```

### 中间件说明

| 中间件 | 别名 | 描述 |
|--------|------|------|
| `Authenticate` | `admin.auth` | 检查用户是否已登录 |
| `Permission` | `admin.permission` | 验证用户权限 |
| `Session` | `admin.session` | 会话超时管理 |

## 登录系统

### 登录页面

访问 `/admin/login` 查看登录页面。

登录页面功能：

- 支持用户名或邮箱登录
- 密码可见性切换
- 记住我功能
- 登录失败频率限制（5 次失败后锁定 60 秒）
- 审计日志记录

### 登录组件

XAdmin 使用 Livewire 组件处理登录：

```php
namespace XAdmin\Auth;

use Livewire\Component;

class LoginComponent extends Component
{
    public string $username = '';
    public string $password = '';
    public bool $remember = false;
    public bool $showPassword = false;

    public function login(): void
    {
        // 验证和认证逻辑
    }
}
```

### 登录频率限制

为防止暴力攻击，登录系统内置频率限制：

- **最大尝试次数**：5 次
- **锁定持续时间**：60 秒
- **频率限制基础**：用户名 + IP 地址

超过限制后会显示：

```
登录尝试次数过多。请在 {seconds} 秒后重试。
```

### 审计日志

所有登录尝试（成功和失败）都会记录在 `auth_logs` 表中：

```php
// 登录失败记录
AuthLog::create([
    'user_id' => $user?->id,
    'username' => $username,
    'ip_address' => request()->ip(),
    'user_agent' => request()->userAgent(),
    'action' => 'login_failed',
    'successful' => false,
]);

// 登录成功记录
AuthLog::create([
    'user_id' => $user->id,
    'username' => $username,
    'ip_address' => request()->ip(),
    'user_agent' => request()->userAgent(),
    'action' => 'login',
    'successful' => true,
]);
```

## 用户管理

### AdminUser 模型

XAdmin 使用 `AdminUser` 模型管理管理员用户：

```php
namespace XAdmin\Auth;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminUser extends Authenticatable
{
    use HasRoles; // 角色管理 trait

    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'avatar',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
```

### 用户字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `username` | string | 用户名（唯一） |
| `email` | string | 邮箱（唯一） |
| `password` | string | 密码（bcrypt 加密） |
| `name` | string | 显示名称 |
| `avatar` | string | 头像路径 |
| `is_active` | boolean | 是否激活 |
| `remember_token` | string | 记住我令牌 |

## 角色和权限

### 角色管理

XAdmin 提供基于角色的访问控制（RBAC）：

```php
// 为用户分配角色
$user->roles()->attach($roleId);

// 移除用户角色
$user->roles()->detach($roleId);

// 检查用户是否有角色
$user->hasRole('admin');
```

### 权限管理

```php
// 检查用户是否有权限
$user->can('posts.create');
$user->hasPermission('posts.edit');

// 在中间件中使用
Route::middleware(['admin.permission:posts.create']);
```

### HasRoles Trait

`AdminUser` 模型使用 `HasRoles` trait 提供角色和权限方法：

```php
namespace XAdmin\Auth;

trait HasRoles
{
    // 获取用户所有角色
    public function roles(): BelongsToMany;

    // 获取用户所有权限
    public function permissions(): Collection;

    // 检查是否有角色
    public function hasRole(string $role): bool;

    // 检查是否有权限
    public function hasPermission(string $permission): bool;

    // 分配角色
    public function assignRole(string $role): void;

    // 移除角色
    public function removeRole(string $role): void;
}
```

## 密码管理

### 修改密码

管理员可以在个人中心修改密码：

```php
namespace XAdmin\Auth;

use Livewire\Component;
use Illuminate\Support\Facades\Hash;

class PasswordChangeComponent extends Component
{
    public string $currentPassword = '';
    public string $newPassword = '';
    public string $newPasswordConfirmation = '';

    public function change(): void
    {
        // 验证当前密码
        // 更新为新密码
    }
}
```

### 密码重置

密码重置功能通过邮件发送重置链接：

```php
// 发送密码重置邮件
Password::sendResetLink([
    'email' => $email,
]);

// 重置密码
Password::reset([
    'email' => $email,
    'password' => $newPassword,
    'password_confirmation' => $newPassword,
    'token' => $token,
], function ($user, $password) {
    $user->password = Hash::make($password);
    $user->save();
});
```

## 登出

### 登出组件

```php
namespace XAdmin\Auth;

use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class LogoutComponent extends Component
{
    public function logout(): void
    {
        $user = Auth::guard('admin')->user();

        // 记录登出日志
        AuthLog::create([
            'user_id' => $user?->id,
            'action' => 'logout',
            'ip_address' => request()->ip(),
        ]);

        Auth::guard('admin')->logout();
        session()->invalidate();
        session()->regenerateToken();

        $this->redirect(route('admin.login'), navigate: true);
    }
}
```

## 会话管理

### 会话超时

XAdmin 提供会话超时功能，可配置空闲超时时间：

```php
// config/admin.php
'session' => [
    'timeout' => 3600, // 1 小时无活动后超时
],
```

### 会话中间件

`SessionTimeout` 中间件检查用户会话状态：

```php
namespace XAdmin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class SessionTimeout
{
    public function handle($request, Closure $next)
    {
        if (! Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }

        // 检查会话超时
        // 更新最后活动时间

        return $next($request);
    }
}
```

## 安全功能

### 密码加密

所有密码都使用 bcrypt 加密：

```php
use Illuminate\Support\Facades\Hash;

// 加密密码
$hashedPassword = Hash::make($password);

// 验证密码
Hash::check($password, $hashedPassword);
```

### CSRF 保护

所有表单自动应用 CSRF 保护：

```html
@csrf
```

### 会话固定攻击保护

登录成功后自动重新生成会话 ID：

```php
session()->regenerate();
```

## 完整示例

### 创建管理员用户

```php
use XAdmin\Auth\AdminUser;

$user = AdminUser::create([
    'username' => 'admin',
    'email' => 'admin@example.com',
    'name' => '系统管理员',
    'password' => Hash::make('password'),
    'is_active' => true,
]);

// 分配管理员角色
$user->assignRole('admin');
```

### 检查权限

```php
use XAdmin\Auth\AdminUser;

$user = AdminUser::find(1);

// 检查角色
if ($user->hasRole('admin')) {
    // 管理员操作
}

// 检查权限
if ($user->hasPermission('posts.delete')) {
    // 删除文章
}
```

### 自定义认证中间件

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CustomAuth
{
    public function handle($request, Closure $next)
    {
        if (! Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }

        // 自定义检查
        $user = Auth::guard('admin')->user();

        if (! $user->is_active) {
            Auth::guard('admin')->logout();
            return redirect()->route('admin.login')
                ->with('error', '您的账户已被禁用');
        }

        return $next($request);
    }
}
```

## 下一步

- [Grid 组件](/zh/components/grid) - 数据表格显示
- [Form 组件](/zh/components/form) - 创建和编辑数据
- [CRUD 教程](/zh/examples/crud) - 完整的 CRUD 示例
