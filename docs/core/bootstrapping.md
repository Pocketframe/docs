---
sidebar_position: 4
---

# Bootstrapping
Pocketframe is designed to be lightweight and flexible, allowing developers to customize the bootstrapping process. The bootstrapping process initializes the application by loading configuration files, binding services, setting up the environment, and preparing the application to handle requests.

## Bootstrapping Process

1. Initialization:
   - Create a new Container and Router instance.
   - Load routes (web and API) via require statements.
   - Load environment variables from a `.env` file.

2. Error Handling:
   - Set a global exception handler using `ExceptionHandler`.

3. Middleware & Bindings:
   - Register middleware with the router.
   - Register framework-level bindings (e.g., exception handling, database, logging) using a base container register.
   - Register application-specific bindings via `ContainerRegister` located in `app/container/ContainerRegister`.

4. Database Setup:
   - Configure the database connection and retrieve the instance.
   - Bind the database’s container dependency.

5. Finalization:
   - Set the container instance globally ensuring consistent dependency resolution throughout the application.

### Registering Middleware
Middlewares can be registered in the config/middleware.php file and will be automatically registered with the router.
```php showLineNumbers
<?php

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
  /**
   * Middleware groups
   * These middleware groups are applied to the routes in the web.php file
   *
   * @var array<string, array<class-string>>
   */
  'groups' => [
    'web' => [
      // AuthMiddleware::class,
    ],
    /**
     * Middleware for API routes
     *
     * These middleware groups are applied to the routes in the api.php file
     * @var array<class-string>
     */
    'api' => [
      // ApiAuthMiddleware::class,
    ],
  ],
];
```

### Registering Container Bindings
Container bindings are registered in the `app/container/ContainerRegister.php` file. This file is automatically loaded by the framework and is where you can register your application-specific bindings.

```php showLineNumbers
<?php

namespace App\Container;

use Pocketframe\Container\Container;
use Pocketframe\Container\ContainerRegister as BaseContainerRegister;

class ContainerRegister extends BaseContainerRegister
{
  public function register(Container $container)
  {
    $container->bind(PostService::class, function ($container) {
      $userService = $container->get(UserService::class);
      return new PostService($userService);
    });

  }
}
```

Finally, the container is set globally to ensure consistent dependency resolution throughout the application.
