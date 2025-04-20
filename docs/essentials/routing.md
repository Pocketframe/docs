---
sidebar_position: 6
---

# Routing

Routing in Pocketframe is managed by the Router class. Routes are defined in `routes/web.php` and `routes/api.php`.

The Router class is responsible for handling HTTP requests and dispatching them to the appropriate controller action.

```php showLineNumbers
$router->get('/', ['HomeController', 'index'], name: 'home.index');
```

:::info
The first parameter of the `get` method is the route **path**, the second parameter is an array containing the **controller** and **action**, and the third parameter is the **name** of the route.
:::

You can also define middleware for routes using route groups.

```php showLineNumbers
// routes/web.php

use App\Controllers\DashboardController;

$router->group(['middleware' => 'auth'], function ($router) {
  $router->get('/dashboard', ['DashboardController', 'index'], name: 'dashboard.index');
});

/*
Output:
 127.0.0.1:8000/dashboard
*/
```

If you want to define prefix routes, you can use the `group` method.

```php showLineNumbers
// routes/web.php

use App\Controllers\DashboardController;

$router->group(['prefix' => 'admin'], function ($router) {
  $router->get('/dashboard', ['DashboardController', 'index'], name: 'dashboard.index');
});

/*
Output:
 127.0.0.1:8000/admin/dashboard
*/
```

You can also group routes by their controllers:

```php showLineNumbers
// routes/web.php

use App\Controllers\PostsController;

$router->group(['controller' => PostsController::class], function ($router) {
  $router->get('/posts', 'index', name: 'posts.index');
  $router->get('/posts/create', 'create', name: 'posts.create');
});

/*
Output:
 127.0.0.1:8000/posts
 127.0.0.1:8000/posts/create
*/
```

Combining all features, you can create a route like this:

```php showLineNumbers
// routes/web.php

use App\Controllers\PostsController;

$router->group([
  'prefix'     => 'posts',
  'middleware' => [AuthMiddleware::class, CsrfMiddleware::class],
  'controller' => PostsController::class
], function ($router) {
  $router->get('/', 'index', name: 'posts.index');
  $router->get('/create', 'create', name: 'posts.create');
});

/*
Output:
 127.0.0.1:8000/posts
 127.0.0.1:8000/posts/create
*/
```

**Available Methods:**

- `get()`: Define a route for GET requests.
- `post()`: Define a route for POST requests.
- `put()`: Define a route for PUT requests.
- `delete()`: Define a route for DELETE requests.
- `group()`: Define a group of routes.
