---
sidebar_position: 20
---

# Helper Functions

Pocketframe provides a set of helper functions that can be used throughout your application. These functions are designed to make common tasks easier and more efficient. Below is a list of some of the most commonly used helper functions.

## Helper Functions

### `dd($value)`

The `dd` function is a shorthand for "dump and die". It is used to dump the contents of a variable and stop the execution of the script. This is useful for debugging purposes.

```php showLineNumbers
dd('Hello World!');

Output:

// Hello World!
```

### `base_path($path = '')`
The `base_path` function returns the absolute path to the base directory of your application. You can pass an optional `$path` argument to append to the base path.

```php showLineNumbers
$basePath = base_path('app/Controllers');

echo $basePath;

Output:

// /path/to/your/application/app/Controllers
```

### `urlIs($url)`
The `urlIs` function checks if the current URL matches the given URL. It returns `true` if it matches, and `false` otherwise.

```php showLineNumbers
if (urlIs('/home')) {
    echo 'You are on the home page.';
} else {
    echo 'You are not on the home page.';
}

Output:

// You are on the home page.
```

### `error($message)`
The `error` function is used to display an error message. It can be used to show validation errors or any other type of error message.

```php showLineNumbers
error('This is an error message.');

Output:

// This is an error message.
```

### `display_errors($errors)`
The `display_errors` function is used to display a list of error messages. It takes an array of error messages as an argument and displays them.

```php showLineNumbers];
display_errors('Name is required.'');

Output:

// - Name is required.
```

### `error_message($message)`
The `error_message` function is used to display a single error message. It takes a message as an argument and displays it.

```php showLineNumbers
error_message('This is a single error message.');

Output:

// This is a single error message.
```

### `abort($code, $message = '')`

The `abort` function is used to abort the current request and return an HTTP response with the given status code. You can also pass an optional message to display.

```php showLineNumbers
abort(404, 'Page not found.');

Output:

// Page not found.
```

### `redirect($url)`
The `redirect` function is used to redirect the user to a different page. It takes a URL as an argument and redirects the user to that URL.

```php showLineNumbers
redirect('/home');

Output:

// Redirects to /home
```

### `old($key, $default = null)`
The `old` function is used to retrieve the old input value for a given key. This is useful for repopulating form fields after a validation error.

```php showLineNumbers
old('name');

Output:

// John Doe
```

### `env($key, $default = null)`
The `env` function is used to retrieve the value of an environment variable. You can pass a default value as the second argument, which will be returned if the environment variable is not set.

```php showLineNumbers
env('APP_NAME');

Output:

// Pocketframe
```

### `numberToWords($number)`
The `numberToWords` function converts a number to its corresponding word representation. This is useful for displaying numbers in a more human-readable format.

```php showLineNumbers
$number = 123;
numberToWords($number);

Output:

// One Hundred Twenty-Three
```

### `asset($path)`
The `asset` function generates a URL for an asset using the base URL of your application. You can pass the path to the asset as an argument.

```php showLineNumbers
asset('images/logo.png');

Output:

// http://localhost:8000/images/logo.png
```

### `store_path($path)`
The `store_path` function returns the absolute path to the storage directory of your application. You can pass an optional `$path` argument to append to the storage path.

```php showLineNumbers
store_path('uploads');

Output:

// /path/to/your/application/storage/uploads
```

### `database_path($path)`

The `database_path` function returns the absolute path to the database directory of your application. You can pass an optional `$path` argument to append to the database path.

```php showLineNumbers
database_path('schemas');

Output:

// /path/to/your/application/database/schemas
```

### `sanitize($value)`

The `sanitize` function is used to sanitize a string by removing any unwanted characters. This is useful for preventing XSS attacks and ensuring that user input is safe to display.

```php showLineNumbers
sanitize('<script>alert("XSS Attack!");</script>');

Output:

// alert("XSS Attack!");
```

### `config_path($path)`
The `config_path` function returns the absolute path to the configuration directory of your application. You can pass an optional
`$path` argument to append to the configuration path.

```php showLineNumbers
config_path('app');

Output:

// /path/to/your/application/config/app.php
```

### `config($key, $default = null)`

The `config` function is used to retrieve a configuration value from the configuration file. You can pass the key of the configuration value as the first argument and an optional default value as the second argument.

```php showLineNumbers
config('app.name');

Output:

// Pocketframe
```

### `routes_path($path)`
The `routes_path` function returns the absolute path to the routes directory of your application. You can pass an optional `$path` argument to append to the routes path.

```php showLineNumbers
routes_path('web.php');

Output:

// /path/to/your/application/routes/web.php
```

### `storage_path($path)`
The `storage_path` function returns the absolute path to the storage directory of your application. You can pass an optional `$path` argument to append to the storage path.

```php showLineNumbers
storage_path('logs/app.log');

Output:

// /path/to/your/application/storage/logs/app.log
```

### `route($name, $params = [])`
The `route` function generates a URL for a named route. You can pass the name of the route as the first argument and an optional array of parameters as the second argument.

```php showLineNumbers
route('home');
route('user.profile', ['id' => 1]);

Output:

// http://localhost:8000/home
// http://localhost:8000/user/1
```

### `flash($key, $value)`
The `flash` function is used to store a value in the session for the next request. This is useful for displaying flash messages or temporary data.

```php showLineNumbers
flash('success', 'Your profile has been updated successfully.');
```

### `get_flash($key)`
The `get_flash` function retrieves a value from the session that was stored using the `flash` function.

```php showLineNumbers
get_flash('success');

Output:

// Your profile has been updated successfully.
```

### `has_flash($key)`

The `has_flash` function checks if a value exists in the session that was stored using the `flash` function.

```php showLineNumbers
has_flash('success');

Output:
// true
```

### `flash_old_input($key, $value)`

The `flash_old_input` function is used to store an old input value in the session for the next request. This is useful for repopulating form fields after a validation error.

```php showLineNumbers
flash_old_input('name', 'John Doe');
```

### `get_old_input($key)`
The `get_old_input` function retrieves an old input value from the session that was stored using the `flash_old_input` function.

```php showLineNumbers
get_old_input('name');

Output:

// John Doe
```

### `session($key, $value = null)`

The `session` function is used to retrieve or set a value in the session. You can pass the key of the session value as the first argument and an optional value as the second argument. If you pass a value, it will set the session value; if you don't pass a value, it will retrieve the session value.

```php showLineNumbers
session('name', 'John Doe');
session('name');
session('age', 30);
session('age');

Output:

// John Doe
// 30
```

### `fromEntity($entity)`

Get the Query Engine for the given entity. This is useful for performing database operations on the entity.

```php showLineNumbers
use App\Entities\User;

$users = fromEntity(User::class)->where('age', '>', 18)->get();

foreach ($users as $user) {
    echo $user->name;
}

Output:

// [John Doe, Jane Doe]
```


