---
sidebar_position: 4
---

# Core Concepts

Pocketframe is built on a few core concepts that make it a powerful and flexible framework for building web applications. Understanding these concepts will help you leverage the full potential of Pocketframe.


## MVC Architecture
Pocketframe follows the Model-View-Controller (MVC) architecture, which separates the application logic into three interconnected components:
- **Model**:

  Represents the data and business logic of the application. It interacts with the database and performs operations like creating, reading, updating, and deleting records.

- **View**:

  Represents the user interface of the application. It displays data to the user and handles user interactions.
- **Controller**:

  Acts as an intermediary between the Model and View. It processes user requests, interacts with the Model to retrieve or update data, and returns the appropriate View to the user.

- **Route**:
-
  Defines the URL patterns and maps them to specific controllers and actions. It acts as a bridge between the incoming request and the appropriate controller.

- **Middleware**:

  Provides a way to filter HTTP requests entering your application. Middleware can perform actions before or after the request is processed, such as authentication, logging, and CORS handling.

- **Service Container**:

  A powerful tool for managing class dependencies and performing dependency injection (DI). It allows you to bind classes to the container and resolve them when needed.

- **Request**:

  Represents the HTTP request made by the user. It contains information about the request method, headers, parameters, and body.

- **Response**:

  Represents the HTTP response sent back to the user. It contains the status code, headers, and body of the response.

- **Environment**:

  Provides a way to manage environment variables and configuration settings for different environments (development, testing, production). It allows you to load environment variables from a `.env` file and access them throughout the application.

- **Configuration**:

  Contains the configuration files for your application. It allows you to define settings for different components of the application, such as database connections, filesystem, and application settings.

- **Database**:

  Provides a way to interact with the database. It allows you to perform CRUD operations, run queries, and manage database connections.

- **Schemas**:

  Represents the structure of a database table. It defines the columns, data types, and constraints for the table.

- **Blueprint**:

  Generates dummy data for testing and development purposes. It generates random data for various data types, such as names, addresses, and phone numbers.
.
- **Entity**:

  Represents a single record in the database. It contains properties that correspond to the columns in the database table and methods for interacting with the data.

## Application Life Cycle
The application starts in index.php which:
- Initializes the session and loads Composer’s autoloader.
- Requires bootstrap.php to create the container and router instances.
- Loads routes and environment variables.
- Registers middleware and container bindings (both framework–level and application-specific).
- Configures the database and sets it in the container.
Finally, the App is initiated and run to handle the HTTP request.


## Service Container
The service container is a powerful tool for managing class dependencies and performing dependency injection (DI). It is used to bind and resolve classes throughout the application.

### Dependency Injection
Dependency injection is a design pattern that allows a class to receive its dependencies from an external source rather than creating them itself. This promotes loose coupling and makes the code more modular and testable.

#### Container Basics
The container provides methods for binding classes to the container and resolving them when needed.

#### Binding
Binding a class to the container is done using the `bind` method. The first parameter is the class name, and the second is a closure that returns an instance of the class.

```php showLineNumbers
$container->bind(Database::class, function () {
  $config = require config_path('database');
  return new Database($config['database']);
});
```

#### Singleton Binding
To create a singleton instance, use the `singleton` method.

```php showLineNumbers
$container->singleton(Database::class, function () {
  $config = require config_path('database');
  return new Database($config['database']);
});
```
This ensures that only one instance of the class is created and shared throughout the application.

#### Resolving
Resolving a class from the container is done using the `getInstance` method. The first parameter is the class name.

```php showLineNumbers
$container->getInstance(Database::class);
```

#### Advanced Container Features
The container also provides:
- Singleton binding via the `singleton` method.
- Storing pre-created instances via the `instance` method.
- Automatic dependency resolution using reflection.




