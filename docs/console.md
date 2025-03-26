---
sidebar_position: 18
---

# Console
Pocketframe provides a command-line interface (CLI) that allows you to perform various tasks, such as start the serve, creating new controllers, clearing cache, and more.

### Starting the server
To start the server, use the `serve` command:
```bash
php pocket serve
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
This will create a symbolic link to the storage directory.

### add:key
To add a new key to the .env file, use the `add:key` command:

```bash
php pocket add:key
```
