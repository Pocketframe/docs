---
sidebar_position: 7
---

# Middleware

Middleware provides a convenient mechanism for filtering HTTP requests entering your application. Global middleware is applied to all routes, while route-specific middleware can be applied to individual routes or groups.

## Global Middleware

All global middleware is defined in the `config/middleware.php` file. These middleware will run on every request through the application.

```php showLineNumbers
return [
    /**
     * Global middleware that runs on every request
     *
     * @var array<class-string>
     */
    'global' => [
        CsrfMiddleware::class,
        SessionMiddleware::class,
    ],
];
```

## Route-Specific Middleware

You can apply middleware to a specific route or group of routes by using the `group` method with a closure.

```php showLineNumbers
$router->group(['middleware' => [CsrfMiddleware::class]], function ($router) {
    $router->get('/posts', ['PostsController', 'index'], name: 'posts.index');
});
```

You can also define middleware groups in the `config/middleware.php` file.

```php
/**
 * Middleware groups
 * These middleware groups are applied to the routes in the web.php file
 *
 * @var array<string, array<class-string>>
 */
'groups' => [
  'web' => [
    AuthMiddleware::class,
  ],
];
```

## Creating Middleware

You can create your own middleware and register it in the `config/middleware.php` file or apply it to a specific route or group of routes. To create a middleware run a pocket command `php pocket make:middleware <name>`

### Example Middleware:

```bash
php pocket make:middleware ExampleMiddleware
```

The middleware will be created in the `app/Middleware` directory.

```php showLineNumbers
<?php

namespace App\Middleware;

use Closure;
use Pocketframe\Contracts\MiddlewareInterface;
use Pocketframe\Http\Request\Request;
use Pocketframe\Http\Response\Response;

class ExampleMiddleware implements MiddlewareInterface
{
  public function handle(Request $request, Closure $next): Response
  {
    // Pre-middleware logic
    $response = $next($request);

    // Post-middleware logic
    return $response;
  }
}
```

