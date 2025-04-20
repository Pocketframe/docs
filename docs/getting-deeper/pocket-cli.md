---
sidebar_position: 19
---

# Pocket CLI

Pocket CLI is a command-line interface for Pocketframe that allows you to interact with your application from the command line. It provides a set of commands that you can use to perform common tasks, such as creating controllers, entities, and views, as well as applying schemas and planting data to your database.
It is designed to make it easier to work with Pocketframe and to help you automate common tasks that you would normally do from the command line. It is a powerful tool that can help you automate your development workflow and make it easier to manage your application.

## Basic Usage

### Starting the server
To start the server, use the `serve` command:
```bash
php pocket serve
```

This will start the built-in PHP server and serve your application. You can access your application in your web browser at `http://localhost:8000`.

You can also specify a different port by using the `--port` option:

```bash
php pocket serve --port=8080
```

### Creating a new controller

To create a new controller, use the `controller:create` command:
```bash
php pocket controller:create PostController
```
The generated controller will be placed in the app/Controllers Web or API directory.

### Creating a middleware
To create a new middleware, use the `middleware:create` command:
```bash
php pocket middleware:create AuthMiddleware
```
The generated middleware will be placed in the app/Middleware directory.

### Clear Views
To clear the views cache, use the `clear:views` command:
```bash
php pocket clear:views
```
This will clear the views cache, which can be useful if you have made changes to your views and want to see the changes immediately.

### store:link
To create a symbolic link to the storage directory, use the `store:link` command:
```bash
php pocket store:link
```
This will create a symbolic link to the storage directory. This is useful for serving files from the storage directory, such as images or other assets.

### add:key
To add a new key to the .env file, use the `add:key` command:

```bash
php pocket add:key
```

### Creating a new entity
To create a new entity, use the `entity:create` command:
```bash
php pocket entity:create User
```
Options:
- `-s`: Generate a schema script.
- `-b`: Generate a blueprint.

The generated entity will be placed in the app/Entities directory.

### Creating a schema

To create a new table script, use the `schema:create` command:
```bash
php pocket schema:create CreateUserTable
```
This will create a new schema script in the database/schema directory. You can then edit this script to define the structure of your table.

### Creating a session table
To create a session table script, use the `schema:session-table` command:
```bash
php pocket schema:session-table
```

### Managing schemas
To manage database schemas, use the `schema` command:
```bash
php pocket schema apply
```
Options:
- `apply`: Apply all pending schemas scripts.
- `rollback`: Rollback the last batch of schemas.
- `fresh`: Drop all tables and reapply all schemas.

### Creating a data planter
To create a new data planter, use the `planter:create` command:
```bash
php pocket planter:create User
```

:::tip
Do not include the `Planter` suffix when creating a planter. The CLI will automatically append it.
:::

The generated planter will be placed in the app/Planters directory.

### Planting the database

To plant the database with data planters, use the `plant` command:
```bash
php pocket plant
```

This will run all the planters in the app/Planters directory. You can also specify a specific planter class to run by using the `--class` option:

Options:

 `--class=PlanterClass`: Run a specific planter class.

### Creating a blueprint
To create a new entity blueprint, use the `blueprint:create` command:

```bash
php pocket blueprint:create User
```

This will create a new blueprint file in the app/Blueprints directory. You can then edit this file to define the structure of your entity.

:::tip
Do not include the `Blueprint` suffix when creating a blueprint. The CLI will automatically append it.
:::

### Creating a view
To create a new view file, use the `view:create` command:
```bash
php pocket view:create HomeView
```

### Creating a component
To create a new component class with its view stub, use the `component:create` command:
```bash
php pocket component:create NavbarComponent
```
Options:
- `--inline`: Generate an inline component.

### Creating a partial view
To create a new partial view file, use the `partial:create` command:
```bash
php pocket partial:create HeaderPartial
```

### Displaying help
To display a list of all available commands, use the `help` command:
```bash
php pocket help
```

### About Pocketframe
To display information about your application.
```bash
php pocket about
```

