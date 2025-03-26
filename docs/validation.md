---
sidebar_position: 17
---

# Validation

### Introduction

Validation is one of the most important features in the modern web application development. This is why Pocketframe comes packed with a powerful validation system that allows you to validate user input and ensure that it meets the required criteria.

### How validators work
To learn how validation works in Pocketframe, let's create a simple application that allows us to create a new post.

### Defining the route
First, we need to define a route in `web.php` that will handle the creation of a new post. We can do this by adding the following code to our routes file:

```php showLineNumbers
<?php
use App\Controllers\PostController;

Route::get('/posts/create', [PostController::class, 'create']);
Route::post('/posts', [PostController::class, 'store']);
```
The `get` method is used to define a route that will be accessible via a GET request, while the `post` method is used to define a route that will be accessible via a POST request.

### Creating the controller
Next, we need to create a controller that will handle the creation of a new post. We can do this by creating a new file called `PostController.php` in the `app/Controllers` directory and adding the following code to it:

```php showLineNumbers
<?php
namespace App\Controllers;

use Pocketframe\Http\Request;
use Pocketframe\Http\Response;

class PostController
{
  public function create()
  {
    return Response::view('posts.create');
  }

  public function store(Request $request)
  {
    // Logic goes here

    return Response::redirect('/posts');
  }
}
```

### Adding validation

Now that we have defined the route and created the controller, we can add validation to the `store` method. We can do this by adding the following code to the `store` method:

```php showLineNumbers
use Pocketframe\Masks\Validator;

public function store(Request $request)
{
   Validator::validate($request->all(), [
        'title' => ['required', 'string'],
        'body'  => ['required'],
      ])
      ->failed();

  ....

  return Response::redirect('/posts');
}
```

In this example, we are using the `Validator` mask to validate the input data. You should import this **mask**  `Pocketframe\Masks\Validator;` for you to able to use it We are passing the request data and an array of validation rules to the `validate` method. The `validate` method will return a `Validator` instance, which we can use to check if the validation failed or not.

### Defining validation errors
If the incoming request fails validation, we can display the validation errors to the user.

```html showLineNumbers
<-- /resources/views/post/create.view.php -->

<form method="POST" action="{{ route('posts.store') }}">
  @csrf
  <div>
    <label for="title">Post Title</label>
    <input id="title" type="text" name="title" />
    {{ display_errors('title') }}
  </div>
</form>
```

### Repopulating the form
If the validation fails, we can repopulate the form with the user's input by adding the following code in the form input.

```html showLineNumbers
<!-- /resources/views/post/create.view.php -->

 <input id="title" type="text" name="title" value="{{ old('title') }}"/>
 ```

 ### Displaying customem error messages
 You can also display custom error messages for specific fields by calling a message method on the validator instance.

 ```php showLineNumbers
 use Pocketframe\Masks\Validator;

Validator::validate($request->all(), [
  'title' => ['required', 'string'],
  'body'  => ['required'],
])
->message([
  'title.required' => 'You need to fill this',
  'body.required'  => 'Body cannot be empty'
])
->failed();
```

### Available validation rules
Pocketframe provides a set of built-in validation rules that you can use to validate user input. Here are some of the most commonly used rules:

- `required`: This rule ensures that the field is not empty.
  **Example**:
  ```php
  'name' => ['required']
  ```
- `string`: This rule ensures that the field contains only strings.
  **Example**:
  ```php
  'name' => ['string']
  ```
- `email`: This rule ensures that the field contains a valid email address.
  **Example**:
  ```php
  'email' => ['email']
  ```
- `numeric`: This rule ensures that the field contains only numeric values.
  **Example**:
  ```php
  'age' => ['numeric']
  ```
- `min`: This rule ensures that the field contains a minimum number of characters.

  **Example**:
  ```php
  'password' => ['min:8']
  ```
- `max`: This rule ensures that the field contains a maximum number of characters.

  **Example**:
  ```php
  'username' => ['max:20']
  ```
- `Unique`: This rule ensures that the field contains a unique value.

  **Example**:
  ```php
  use Pocketframe\Validation\Rules\Unique;

  'email' => [new Unique('users', 'email')]
  ```

- `date`: This rule ensures that the field contains a valid date.

  **Example**:
  ```php
  'date_of_birth' => ['date']
  ```

- `image`: This rule ensures that the field contains a valid image file.

  **Example**:
  ```php
  'avatar' => ['image']
  ```
- `nullable`: This rule allows the field to be empty.

  **Example**:
  ```php
  'bio' => ['nullable']
  ```

- `lowercase`: This rule ensures that the field contains only lowercase characters.

  **Example**:
  ```php
  'username' => ['lowercase']
  ```

- `uppercase`: This rule ensures that the field contains only uppercase characters.

  **Example**:
  ```php
  'username' => ['uppercase']
  ```

- `sometime`: This rule ensures that the field contains only alphanumeric characters.
-
  **Example**:
  ```php
  'username' => ['sometime', 'required']
  ```

- `file`: This rule ensures that the field contains a valid file.

  **Example**:
   ```php
   'avatar' => ['file']
   ```
