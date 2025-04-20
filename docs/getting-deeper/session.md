---
sidebar_position: 16
---

# Session

## Introduction

Web applications are HTTP driven, which means they are stateless, or in other words, each request is independent of the previous one. Pocketframe provides a simple and easy-to-use session management system that allows you to store and retrieve data between requests. By default this supports database, cookies and file based sessions storage. We will add support for Redis and other session stores in the future.

## Configuration

The session configuration is stored in `config/session.php`. This file contains the configuration for the session system. You can modify the configuration to change the session driver, session lifetime, and other settings.

```php
<?php

return [

    /**
     * The session driver.
     *
     * @var string
     *
     */
    'driver' => 'database', // Available: database, cookie, file


    /**
     * The session lifetime in minutes.
     *
     * @var int
     *
     */
    'lifetime' => 120,


    /**
     * The session files directory.
     *
     * @var string
     *
     */
    'files' => storage_path('framework/sessions'),


    /**
     * The session cookie name.
     *
     * @var string
     *
     */
    'cookie' => 'pocketframe_session',


    /**
     * The session cookie path.
     *
     * @var string
     *
     */
    'path' => '/',


    /**
     * The session cookie domain.
     *
     * @var string
     *
     */
    'domain' => null,


    /**
     * The session cookie secure flag.
     *
     * @var bool
     *
     */
    'secure' => false,


    /**
     * The session cookie httpOnly flag.
     *
     * @var bool
     *
     */
    'httpOnly' => true,


    /**
     * The session cookie sameSite flag.
     *
     * @var string
     *
     */
    'sameSite' => 'lax',
];
```

By default, the session driver is set to `database`. This means that the session data is stored in the database, which provides a secure and reliable way to store session data.

The session `driver` configuration option defines where the session data is stored. The available options are:

- `database`: Stores session data in the database.
- `cookie`: Stores session data in a cookie.
- `file`: Stores session data in a file  **store/framework/sessions**.

## Driver requirements

### Database

The database driver requires a database connection to be configured in the `config/database.php` file. The database connection is used to store the session data in the database. Pocketframe comes with a `sessions` table schema that is used to store the session data and once you run `php pocket schema apply` the table will be created. If you have a existing project you can run a command to create a schema table
```bash
php pocket schema:session-table
```
This will create a `sessions` schema script in the `database/schemas` directory.

Then apply the schema by running

```bash
php pocket schema apply
```

### Cookie

The cookie driver stores session data in a cookie. This is the simplest way to store session data, but it is not recommended for production use. Pocketframe comes with a `cookie` driver that is used to store the session data in a cookie. You can use the `Session` mask to store and retrieve session data.

```php
Session::put('key', 'value');
```

:::info
You can also use the `session()` helper function to store and retrieve session data.

```php
session(['key' => 'value']);
```
:::

### File

The file driver stores session data in a file. This is the simplest way to store session data, but it is not recommended for production use. Pocketframe comes with a `file` driver that is used to store the session data in a file. You can use the `Session` mask to store and retrieve session data.

```php
Session::put('key', 'value');
```

:::info
You can also use the `session()` helper function to store and retrieve session data.

```php
session(['key' => 'value']);
```
:::


## Working with sessions

#### Starting the session

You can start the session by calling the `Session::start()` method. This will manually start the session.

```php
Session::start();
```

#### Checking if the session is started

You can check if the session is started by calling the `Session::isStarted()` method.

```php showLineNumbers
if (Session::isStarted()) {
    // The session is started
}

// Example: if (Session::isStarted()) {
//     // The session is started
// }
```

#### Getting session ID

You can get the session ID by calling the `Session::id()` method. This will return the session ID and will help you to debug and track the session.

```php showLineNumbers
$sessionId = Session::id();

// Example: $sessionId = Session::id();
// $sessionId will be '1234567890'
```

#### Get all session data

You can get all session data by calling the `Session::all()` method. This will return an array of all session data.

```php showLineNumbers
$sessionData = Session::all();

// Example: $sessionData = Session::all();
// $sessionData will be ['name' => 'John', 'age' => 30]
```

#### Session Exists

You can check if a session key exists by calling the `Session::exists($key)` method. This will return true if the session key exists.

```php showLineNumbers
if (Session::exists('key')) {
    // The session key exists
}

```

#### Session has key

You can check if a session key exists by calling the `Session::has($key)` method. This will return true if the session key exists.

```php showLineNumbers
if (Session::has('key')) {
    // The session key exists
}
```

#### Session get

You can get a session key by calling the `Session::get($key)` method. This will return the value of the session key.

```php showLineNumbers
$sessionData = Session::get('key');

// Example: $sessionData = Session::get('name');
// $sessionData will be 'John'
```

#### Session put

You can store session data using the `Session::put($key, $value)` method.

```php showLineNumbers
Session::put('key', 'value');

// Example: Session::put('name', 'John');
```

#### Session Put All

You can store session data using the `Session::putAll($data)` method.

```php showLineNumbers
Session::putAll(['key' => 'value']);

// Example: Session::putAll(['name' => 'John', 'age' => 30]);
// $sessionData will be ['name' => 'John', 'age' => 30]
```

#### Session Remove

You can remove a session key by calling the `Session::remove($key)` method. This will remove the session key from the session.

```php showLineNumbers
Session::remove('key');

// Example: Session::remove('name');
// $sessionData will be ['age' => 30]
```

#### Session flush

You can remove all session data by calling the `Session::flush()` method. This will remove all session data from the session.

```php showLineNumbers
Session::flush();

// Example: Session::flush();
// $sessionData will be []
```

#### Session destroy

You can destroy the session by calling the `Session::destroy()` method. This will destroy the session and remove all session data.

```php showLineNumbers
Session::destroy();

// Example: Session::destroy();
// $sessionData will be []
```

#### Session flash

You can store session data that will only be available for the next request by calling the `Session::flash($key, $value)` method. This will store the session data in the session and make it available for the next request.

```php showLineNumbers
Session::flash('key', 'value');
```
You can also use a helper function to store session data that will only be available for the next request.

```php showLineNumbers
flash('key', 'value');
```

**Example**

```php showLineNumbers
public function store(Request $request): Response
{
  $category = new Category([
    'category_name' => $request->post('category_name'),
    'slug'          => StringUtils::slugify($request->post('category_name')),
  ]);

  $category->save();

  // Store a flash message
  flash('success', 'Category created successfully');

  return Response::redirect(route('admin.categories.index'));
}
```

#### Session hasFlash

You can check if session data is available for the next request by calling the `Session::hasFlash($key)` method. This will return true if the session data is available for the next request.

```php showLineNumbers
if (Session::hasFlash('key')) {
    // The session data is available for the next request
}

// Example: if (Session::hasFlash('name')) {
//     // The session data is available for the next request
// }
```

You can also use a helper function to check if session data is available for the next request.

```php showLineNumbers
if (has_flash('key')) {
    // The session data is available for the next request
}

```

#### Session getFlash

You can get session data that will only be available for the next request by calling the `Session::getFlash($key)` method. This will return the session data that will only be available for the next request.

```php showLineNumbers
$sessionData = Session::getFlash('key');

// Example: $sessionData = Session::getFlash('name');
// $sessionData will be 'John'
```

You can also use a helper function to get session data that will only be available for the next request.

```php showLineNumbers
$sessionData = get_flash('key');

// Example: $sessionData = get_flash('name');
// $sessionData will be 'John'
```

**Example**

```html showLineNumbers
<div>
  @if(has_flash('success'))
  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
    <span class="block sm:inline">{{ get_flash('success') }}</span>
  </div>
  @endif
</div>
```

**Full Usage Example**

```php showLineNumbers
// CategoriesController.php

public function store(Request $request): Response
{
  $category = new Category([
    'category_name' => $request->post('category_name'),
    'slug'          => StringUtils::slugify($request->post('category_name')),
  ]);
  $category->save();

  // Store a flash message
  flash('success', 'Category created successfully');

  return Response::redirect(route('admin.categories.index'));
}
```

```html showLineNumbers
<!-- categories/index.view.php -->

<div>
  @if(has_flash('success'))
  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
    <span class="block sm:inline">{{ get_flash('success') }}</span>
  </div>
  @endif
</div>
```

#### Session old

You can get session data that will only be available for the next request by calling the `Session::old($key)` method. This will return the session data that will only be available for the next request.

```php showLineNumbers
$sessionData = Session::old('key');

// Example: $sessionData = Session::old('name');
// $sessionData will be 'John'
```

You can also use a helper function to get session data that will only be available for the next request.

```php showLineNumbers
$sessionData = old('key');

// Example: $sessionData = old('name');
// $sessionData will be 'John'
```

#### Session Expire

You can expire the session by calling the `Session::expire()` method. This will expire the session and remove all session data.

```php showLineNumbers
Session::expire();

// Example: Session::expire();
// $sessionData will be []
```


#### Session sweep
You can sweep the session by calling the `Session::sweep()` method. This will sweep the session and remove all session data.

```php showLineNumbers
Session::sweep();

// Example: Session::sweep();
// $sessionData will be []
```

The session class is a comprehensive tool for managing session data in Pocketframe. It provides a simple and easy-to-use interface for storing and retrieving session data. It also provides a number of methods for managing session data, such as starting, stopping, and destroying the session.
















