---
sidebar_position: 10
---

# HTTP Request

## Introduction

This class is used to handle the incoming request. It allows you to access request data, headers, and more. The request class is responsible for handling the request data and provides an easy way to access the request data.

### How to use the Request class

You can access the request data using the `Request` class. The request class can be injected into the controller method. This is useful when you need to access the request data in the controller method and will allow you access all the methods and properties of the request class.

```php showLineNumbers
<?php

namespace App\Controllers\Web\Posts;

use Pocketframe\Http\Request\Request;

class PostsController
{
  public function store(Request $request)
  {
    $request->post('title');
  }
}

```

### Available Methods

- **Get the HTTP method of the request (GET, POST, etc.)**

  If you want to get the HTTP method of the request, you can use the `method()` method.

  ```php
  $request->method();
  ```

- **Check the HTTP method of the request**

  If you want to check the HTTP method of the request, you can use the `isMethod($method)` method. This method will return true if the HTTP method of the request matches the method passed to the method.

  ```php
  $request->isMethod('get');
  ```

- **Get the URI of the request**

  If you want to get the URI of the request, you can use the `uri()` method. This method will return the URI of the request.

  ```php
  $request->uri();
  ```

- **Get all request data as an array (GET, POST, FILES)**

  If you want to get all the request data as an array, you can use the `all()` method. This method will return an array of all the request data.

  ```php
  $request->all();
  ```

 - **Get a value from the GET parameters**

    If you want to get a value from the GET parameters, you can use the `get($key)` method. This method will return the value of the GET parameter passed to the method.

    ```php
    $request->get($id);
    ```

- **Get a value from the POST parameters**

  If you want to get a value from the POST parameters, you can use the `post($key)` method. This method will return the value of the POST parameter passed to the method.

  ```php
  $request->post('name');
  ```

- **Get a value from the JSON request body**

  If you want to get a value from the JSON request body, you can use the `json($key)` method. This method will return the value of the JSON request body passed to the method.

  ```php
  $request->json('name');
  ```

- **Check if the request contains JSON data**

  If you want to check if the request contains JSON data, you can use the `isJson()` method. This method will return true if the request contains JSON data.

  ```php
  $request->isJson();
  ```

- **Get an uploaded file by key**

  If you want to get an uploaded file by key, you can use the `file($key)` method. This method will return the uploaded file passed to the method.

  ```php
  $request->file('image');
  ```

- **Get and store the uploaded file**

  You can use the `storeFileOrNull($key, $directory, $disk)` method to get and store the uploaded file. This method will get and store the file if available or return null if not. By default the disk is set to `public` but you can change it to any disk you want.
  ```php
  $request->storeFileOrNull('image', 'public');
  ```


- **Check if a file was uploaded for the given key**
  If you want to check if a file was uploaded for the given key, you can use the `hasFile($key)` method. This method will return true if the file was uploaded for the given key.
  ```php
  $request->hasFile($key);
  ```

- **Check if a parameter exists in the request**

  If you want to check if a parameter exists in the request, you can use the `has($key)` method. This method will return true if the parameter exists in the request.

  ```php
  $request->has('name');
  ```

- **Check if parameter exists and is not empty**

  If you want to check if a parameter exists and is not empty, you can use the `filled($key)` method. This method will return true if the parameter exists and is not empty.


  ```php
  $request->filled('name');
  ```

- **Sanitize input data to prevent XSS attacks**

  If you want to sanitize input data to prevent XSS attacks, you can use the `sanitize($input)` method. This method will sanitize the input data passed to the method.

    ```php
    $request->sanitize('name');
  ```

- **Check if request expects JSON response**

  If you want to check if the request expects a JSON response, you can use the `expectsJson()` method. This method will return true if the request expects a JSON response.

  ```php
  $request->expectsJson();
  ```

- **Get a request header value**

  If you want to get a request header value, you can use the `header($key, $default)` method. This method will return the value of the request header passed to the method.

  ```php
  $request->header('X-Header-Name'
  ```

- **Get a cookie value**

  If you want to get a cookie value, you can use the `cookie($key, $default)` method. This method will return the value of the cookie passed to the method.


  ```php
  $request->cookie('name');
  ```

- **Check if request is an AJAX request**

  If you want to check if the request is an AJAX request, you can use the `isAjax()` method. This method will return true if the request is an AJAX request.


  ```php
  $request->isAjax();
  ```

- **Get the full URL of the request**

  If you want to get the full URL of the request, you can use the `url()` method. This method will return the full URL of the request.

  ```php
  $request->url();
  ```

- **Get the URL of the previous request**

  If you want to get the URL of the previous request, you can use the `previous()` method. This method will return the URL of the previous request.

  ```php
  $request->previous();
  ```

- **Create redirect response to previous URL**

  If you want to create a redirect response to the previous URL, you can use the `back()` method. This method will redirect the user to the previous URL.

  ```php
  $request->back();
  ```

- **Get the user agent string**

  If you want to get the user agent string, you can use the `userAgent()` method. This method will return the user agent string of the request.

  ```php
  $request->userAgent();
  ```

- **Get the client IP address**

  If you want to get the client IP address, you can use the `ip()` method. This method will return the client IP address of the request.

  ```php
  $request->ip();
  ```

- **Check if request was made over HTTPS**

  If you want to check if the request was made over HTTPS, you can use the `isSecure()` method. This method will return true if the request was made over HTTPS.

  ```php
  $request->isSecure();
  ```

- **Set session data**

  If you want to set session data, you can use the `setSession($data)` method. This method will set the session data passed to the method.

  ```php
  $request->setSession($data);
  ```

- **Get all session data**

  If you want to get all the session data, you can use the `session()` method. This method will return all the session data.

  ```php
  $request->session();
  ```

- **Check if request wants JSON response**

  If you want to check if the request wants a JSON response, you can use the `wantsJson()` method. This method will return true if the request wants a JSON response.

  ```php
  $request->wantsJson();
  ```
