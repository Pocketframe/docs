---
sidebar_position: 7
---

# Controllers

### Introduction
Controllers are responsible for handling incoming requests and returning responses. Controllers can group related request handling logic into a single class. They are stored in the app/Controllers directory.

**Creating a Controller:**

To help you create a controller, run the following pocket command:
```bash
php pocket controller:create HomeController
```
:::info
All controllers are stored in the `app/Controllers` directory. Inside the Controllers directory, there are two subdirectories: `Web` and `Api`. The `Web` directory is used for web routes and the `Api` directory is used for API routes.
:::

**Basic Controller Example:**

```php showLineNumbers
<?php

namespace App\Controllers\Web\Posts;

use App\Entities\Category;
use Pocketframe\PocketORM\Database\QueryEngine;
use Pocketframe\Http\Response\Response;

class PostsController
{
  public function index(): Response
  {
    $categories = QueryEngine::for(Category::class)
      ->select(['id', 'category_name'])
      ->where('status', 'active')
      ->include('tags')
      ->get();

    return Response::view('posts.index', compact('categories'));
  }
}
```

Once you have written a controller class and method, you may define a route to the controller method like so:


```php
$router->get('/posts', [PostsController::class, 'index']);
```
When a request is made to the `/posts` route, the `index()` method of the `PostsController` class will be executed.

### Single Action Controllers
Single action controllers are a simple way to define a controller that only has a single action. They are basically have a single method called `__invoke()` that handles the incoming request

To create a single action controller, you can run the following pocket command:
```bash
php pocket controller:create DashboardController --invokable
```
:::tip
You can also abbreviate the command to

`php pocket controller:create DashboardController -i`
:::

**Example:**

```php showLineNumbers
<?php

namespace App\Controllers\Web\Dashboard;

use Pocketframe\Http\Request\Request;

class DashboardController
{
   public function __invoke(Request $request)
    {
       //
    }
}
```

**Corresponding route**
```php
$router->get('/dashboard', DashboardController::class);
```

### Resource Controllers
Resource controllers are a type of controller that is used to handle CRUD operations. They are a great way to organize your code and make it easier to maintain.

If you want to generate a resource controller, you can run the following pocket command:
```bash
php pocket controller:create PostsController --resource
```

:::tip
You can also abbreviate the command to

`php pocket controller:create PostsController -r`
:::


Available actions in a resource controller:

| HTTP Verb | URI             | Action  | Route Name   |
| --------- | --------------- | ------- | ------------ |
| GET       | /posts          | index   | post.index   |
| GET       | /posts/create    | create  | post.create  |
| POST      | /posts           | store   | post.store   |
| GET       | /posts/{`id`}      | show    | post.show    |
| GET       | /posts/{`id`}/edit | edit    | post.edit    |
| PUT       | /posts/{`id`}      | update  | post.update  |
| DELETE    | /posts/{`id`}      | destroy | post.destroy |

### API Controllers
You can also generate a controller specifically for the API. API controllers only contains `index`, `store`, `show`, `update` and `destroy` To do this, you can run the following pocket command:
```bash
php pocket controller:create PostsController --api
```
