---
sidebar_position: 4
---

# Core Concepts

## Service Container
The service container is a powerful tool for managing class dependencies and performing dependency injection (DI). It is used to bind and resolve classes throughout the application.

### Binding
Binding a class to the container is done using the `bind` method. The first parameter is the class name, and the second is a closure that returns an instance of the class.

```php showLineNumbers
$container->bind(Database::class, function () {
  $config = require config_path('database');
  return new Database($config['database']);
});
```

### Resolving
Resolving a class from the container is done using the `getInstance` method. The first parameter is the class name.

```php showLineNumbers
$container->getInstance(Database::class);
```

