---
sidebar_position: 10
---

# HTTP Response

Routes and controllers can return a response which will be sent to the user. The response class is used to send HTTP responses. It supports various response types, including views, JSON, redirects and more. This class also supports status codes and headers.

```php
return Response::view('home');
```

### Available status codes:

This class has has the following status codes.

```php showLineNumbers
Response::OK
Response::CREATED
Response::REDIRECT
Response::BAD_REQUEST
Response::UNAUTHORIZED
Response::FORBIDDEN
Response::NOT_FOUND
Response::METHOD_NOT_ALLOWED
Response::PAGE_EXPIRED
Response::INTERNAL_SERVER_ERROR

```

**Available Methods:**

- **Render a view with optional data and status code**

  If you want to render a view with optional data and status code, you can use the `view()` method. This method will render the view passed to the method and return a response.

  ```php
  Response::view('home', ['name' => 'John Doe']);
  ```

- **Return JSON response with optional status code**

  If you want to return a JSON response with optional status code, you can use the `json()` method. This method will return a JSON response with the data passed to the method and the status code passed to the method.

  ```php
  Response::json(['name' => 'John Doe']);
  ```

- **Send the response to the client**

  If you want to send the response to the client, you can use the `send()` method. This method will send the response to the client.

  ```php
  Response::send();
  ```

- **Redirect to a URL with optional status code**

  If you want to redirect to a URL with optional status code, you can use the `redirect()` method. This method will redirect the user to the URL passed to the method and the status code passed to the method.

  ```php
  Response::redirect('/posts');
  ```

- **Return plain text response with optional status code**

  If you want to return a plain text response with optional status code, you can use the `text()` method. This method will return a plain text response with the text passed to the method and the status code passed to the method.

  ```php
  Response::text('Hello, world!');
  ```

- **Return empty response with 204 status code**

  If you want to return an empty response with 204 status code, you can use the `noContent()` method. This method will return an empty response with the status code 204.

  ```php
  Response::noContent();
  ```

- **Return file download response**

  If you want to return a file download response, you can use the `file()` method. This method will return a file download response with the path passed to the method and the name passed to the method.

  ```php
  Response::file('path/to/file.pdf', 'file.pdf');
  ```

- **Stream response content**

  If you want to stream response content, you can use the `stream()` method. This method will stream the response content passed to the method.

  ```php
  Response::stream(function () {
    echo 'Hello, world!';
  });
  ```

- **Set response header**

  If you want to set a response header, you can use the `setHeader()` method. This method will set the header passed to the method.

  ```php
  Response::setHeader('X-Header-Name', 'X-Header-Value');
  ```

- **Get all response headers**

  If you want to get all response headers, you can use the `getHeaders()` method. This method will return an array of all the response headers.

  ```php
  Response::getHeaders();
  ```

- **Set response cookie**

  If you want to set a response cookie, you can use the `setCookie()` method. This method will set the cookie passed to the method. The cookie will be set for the current request.

  ```php
  Response::setCookie('name', 'value', 0, '/', '', false, false);
  ```
  **Parameters available:**

   - name: the name of the cookie
   - value: the value of the cookie
   - expire: the expiration date of the cookie
   - path: the path of the cookie
   - domain: the domain of the cookie
   - secure: whether the cookie is secure
   - httponly: whether the cookie is httponly

- **Enable response caching**

  If you want to enable response caching, you can use the `cacheFor()` method. This method will cache the response for the number of minutes passed to the method.

  ```php
  Response::cacheFor(10);
  ```

- **Disable response caching**

  If you want to disable response caching, you can use the `noCache()` method. This method will disable response caching.

  ```php
  Response::noCache();
  ```

- **Return JSONP response**

  If you want to return a JSONP response, you can use the `jsonp()` method. This method will return a JSONP response with the data passed to the method and the callback parameter passed to the method.

  ```php
  Response::jsonp(['name' => 'John Doe'], 'callback');
  ```

- **Return formatted JSON response**

  If you want to return a formatted JSON response, you can use the `prettyJson()` method. This method will return a formatted JSON response with the data passed to the method and the status code passed to the method.

  ```php
  Response::prettyJson(['name' => 'John Doe']);
  ```

- **Add response header**

  If you want to add a response header, you can use the `withHeader()` method. This method will add a response header with the name and value passed to the method.

  ```php
  Response::withHeader('X-Header-Name', 'X-Header-Value');
  ```

- **Check if response is successful**

  If you want to check if response is successful, you can use the `isOk()` method. This method will return true if the response is successful.

  ```php
  Response::isOk();
  ```

- **Check if response is redirect**

  If you want to check if response is redirect, you can use the `isRedirect()` method. This method will return true if the response is redirect.

  ```php
  Response::isRedirect();
  ```

- **Check if response is client error**

  If you want to check if response is client error, you can use the `isClientError()` method. This method will return true if the response is client error.

  ```php
  Response::isClientError();
  ```

- **Check if response is server error**

  If you want to check if response is server error, you can use the `isServerError()` method. This method will return true if the response is server error.

  ```php
  Response::isServerError();
  ```

- **Set response as file attachment**

  If you want to set response as file attachment, you can use the `attachment()` method. This method will set the response as a file attachment with the filename passed to the method.

  ```php
  Response::attachment('file.pdf');
  ```
