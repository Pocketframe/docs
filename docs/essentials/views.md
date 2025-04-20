---
sidebar_position: 15
---

# Views

### Introduction
Pocketframe has a simple and powerful view system that is called **Pocket View**.
As you develop your application, you'll often need to display data to the user. Pocketframe provides a powerful view system that allows you to create and render views to your users. The views will not be mixed with the rest of your code, making it easy to manage and maintain your application. They usually separates your logic from your presentation.


```html showLineNumbers
<!-- views/welcome.view.php -->

<html>
  <head>
    <title>Pocketframe</title>
  </head>
  <body>
    <h1>Welcome to {{ $name }}!</h1>
  </body>
</html>
```

Your views are stored in the `resources/views` directory of your application. You can create as many views as you need, and they will be automatically loaded by Pocketframe when you render them. You can also create subdirectories within the `resources/views` directory to organize your views into logical groups.

:::info
 Pocket View has an extension of **.view.php** and compiled into PHP files.
:::

### Creating and Rendering Views
To create a view, you can simply run a command in your terminal:
```bash
php pocket view:create welcome
```
This will create a new view file in the `resources/views` directory. You can then render the view by return a response in your controller:
```php showLineNumbers
<?php
namespace App\Controllers;

use Pocketframe\Http\Request;
use Pocketframe\Http\Response;

class WelcomeController
{
  public function index(Request $request)
  {
    return Response::view('welcome', ['name' => 'Pocketframe']);
  }
}
```

### Passing Data to Views
You can pass data to your views by passing an array of data to the view function:

```php
return Response::view('welcome', ['name' => 'Pocketframe']);
```
