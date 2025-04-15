---
sidebar_position: 12
---

# Error Handling

### Introduction
By default, Pocketframe will display a generic error message for any unhandled exceptions. However, you can customize the error handling behavior by creating a custom error handler.

### Some of the built-in error handlers include:
- **DatabaseException**: Handles database-related errors.
- **AuthenticationException**: Handles authentication-related errors.
- **CacheException**: Handles cache-related errors.
- **ValidationException**: Handles validation-related errors.
- **ConfigurationException**: Handles configuration-related errors.
- **FileSystemException**: Handles file system-related errors.
- **HTTP Exception**: Handles HTTP-related errors.
- **MiddlewareException**: Handles middleware-related errors.

### Creating a Custom Error Handler
You can also create your own custom error handler by extending the `PocketframeException` class.

**Example:**
```php showLineNumbers
<?php

namespace Pocketframe\Exceptions\HTTP;

use Pocketframe\Exceptions\PocketframeException;

class CustomException extends PocketframeException
{
  public function __construct($message = "Custom error message")
  {
    parent::__construct($message, 403);
  }
}
```
