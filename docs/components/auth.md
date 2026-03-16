# Authentication System

XAdmin provides a complete authentication and authorization system, including user login, permission control, role management, and audit logging.

## Authentication Middleware

All admin panel routes are automatically protected by authentication middleware. Unauthenticated users will be redirected to the login page.

### Middleware Configuration

Configure authentication middleware in `config/admin.php`:

```php
'route' => [
    'prefix' => 'admin',
    'middleware' => [
        'admin.auth',      // Authentication check
        'admin.permission', // Permission verification
        'admin.session',    // Session management
    ],
],
```

### Middleware Description

| Middleware | Alias | Description |
|------------|-------|-------------|
| `Authenticate` | `admin.auth` | Check if user is logged in |
| `Permission` | `admin.permission` | Verify user permissions |
| `Session` | `admin.session` | Session timeout management |

## Login System

### Login Page

Visit `/admin/login` to see the login page.

Login page features:

- Support login with username or email
- Password visibility toggle
- Remember me functionality
- Login failure rate limiting (locked for 60 seconds after 5 failures)
- Audit log recording

### Login Component

XAdmin uses Livewire component to handle login:

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
        // Validation and authentication logic
    }
}
```

### Login Rate Limiting

To prevent brute force attacks, the login system has built-in rate limiting:

- **Maximum attempts**: 5 times
- **Lock duration**: 60 seconds
- **Rate limit basis**: Username + IP address

After exceeding the limit, it will display:

```
Too many login attempts. Please try again in {seconds} seconds.
```

### Audit Logging

All login attempts (successful and failed) are recorded in the `auth_logs` table:

```php
// Login failure record
AuthLog::create([
    'user_id' => $user?->id,
    'username' => $username,
    'ip_address' => request()->ip(),
    'user_agent' => request()->userAgent(),
    'action' => 'login_failed',
    'successful' => false,
]);

// Login success record
AuthLog::create([
    'user_id' => $user->id,
    'username' => $username,
    'ip_address' => request()->ip(),
    'user_agent' => request()->userAgent(),
    'action' => 'login',
    'successful' => true,
]);
```

## User Management

### AdminUser Model

XAdmin uses the `AdminUser` model to manage admin users:

```php
namespace XAdmin\Auth;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminUser extends Authenticatable
{
    use HasRoles; // Role management trait

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

### User Fields

| Field | Type | Description |
|-------|------|-------------|
| `username` | string | Username (unique) |
| `email` | string | Email (unique) |
| `password` | string | Password (bcrypt encrypted) |
| `name` | string | Display name |
| `avatar` | string | Avatar path |
| `is_active` | boolean | Is active |
| `remember_token` | string | Remember me token |

## Roles and Permissions

### Role Management

XAdmin provides Role-Based Access Control (RBAC):

```php
// Assign role to user
$user->roles()->attach($roleId);

// Remove user role
$user->roles()->detach($roleId);

// Check if user has a role
$user->hasRole('admin');
```

### Permission Management

```php
// Check if user has a permission
$user->can('posts.create');
$user->hasPermission('posts.edit');

// Use in middleware
Route::middleware(['admin.permission:posts.create']);
```

### HasRoles Trait

The `AdminUser` model uses the `HasRoles` trait to provide role and permission methods:

```php
namespace XAdmin\Auth;

trait HasRoles
{
    // Get all user roles
    public function roles(): BelongsToMany;

    // Get all user permissions
    public function permissions(): Collection;

    // Check if has role
    public function hasRole(string $role): bool;

    // Check if has permission
    public function hasPermission(string $permission): bool;

    // Assign role
    public function assignRole(string $role): void;

    // Remove role
    public function removeRole(string $role): void;
}
```

## Password Management

### Password Change

Admins can change their password in the personal center:

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
        // Validate current password
        // Update new password
    }
}
```

### Password Reset

Password reset functionality sends reset link via email:

```php
// Send password reset email
Password::sendResetLink([
    'email' => $email,
]);

// Reset password
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

## Logout

### Logout Component

```php
namespace XAdmin\Auth;

use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class LogoutComponent extends Component
{
    public function logout(): void
    {
        $user = Auth::guard('admin')->user();

        // Record logout log
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

## Session Management

### Session Timeout

XAdmin provides session timeout functionality with configurable idle timeout:

```php
// config/admin.php
'session' => [
    'timeout' => 3600, // Timeout after 1 hour of inactivity
],
```

### Session Middleware

The `SessionTimeout` middleware checks user session state:

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

        // Check session timeout
        // Update last activity time

        return $next($request);
    }
}
```

## Security Features

### Password Encryption

All passwords are encrypted using bcrypt:

```php
use Illuminate\Support\Facades\Hash;

// Encrypt password
$hashedPassword = Hash::make($password);

// Verify password
Hash::check($password, $hashedPassword);
```

### CSRF Protection

All forms automatically apply CSRF protection:

```html
@csrf
```

### Session Fixation Attack Protection

Automatically regenerates session ID after successful login:

```php
session()->regenerate();
```

## Complete Examples

### Create Admin User

```php
use XAdmin\Auth\AdminUser;

$user = AdminUser::create([
    'username' => 'admin',
    'email' => 'admin@example.com',
    'name' => 'System Administrator',
    'password' => Hash::make('password'),
    'is_active' => true,
]);

// Assign admin role
$user->assignRole('admin');
```

### Check Permissions

```php
use XAdmin\Auth\AdminUser;

$user = AdminUser::find(1);

// Check role
if ($user->hasRole('admin')) {
    // Admin operations
}

// Check permission
if ($user->hasPermission('posts.delete')) {
    // Delete post
}
```

### Custom Authentication Middleware

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

        // Custom check
        $user = Auth::guard('admin')->user();

        if (! $user->is_active) {
            Auth::guard('admin')->logout();
            return redirect()->route('admin.login')
                ->with('error', 'Your account has been disabled');
        }

        return $next($request);
    }
}
```

## Next Steps

- [Grid Component](/components/grid) - Data table display
- [Form Component](/components/form) - Create and edit data
- [CRUD Tutorial](/examples/crud) - Complete CRUD example
