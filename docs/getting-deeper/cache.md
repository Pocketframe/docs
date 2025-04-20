---
sidebar_position: 18
---

# Cache
Cache is a mechanism for storing data temporarily to improve performance and reduce the load on your database. Pocketframe provides a simple caching system that allows you to cache data for a specified period of time.
The cache system is built on top of the file system, which means that it stores cached data in files on the server. This makes it easy to use and requires no additional configuration.

The cache system is designed to be simple and easy to use. You can cache data using the `Cache` class, which provides a simple API for storing and retrieving cached data.

## Configuration

You can configure the cache by modifying the `.env` file. The default cache driver is `file`, which stores cached data in files on the server. You can change the cache driver to `array` or `database` if you prefer.

All cache configuration are stored in the cache.php file in the `config` directory. You can modify the cache configuration by editing the `config/cache.php` file.
The cache configuration file contains the following variables:

```php showLineNumbers
<?php

return [
  /**
   * Default cache driver
   *
   * The default cache driver is used to store data in the cache.
   * The available cache drivers are: "memory", "array", "database", "file", "memcached", "redis".
   * The default cache driver is "file".
   *
   * @var string
   */
  'driver' => env('CACHE_DRIVER', 'file'),


  /**
   * File cache configuration
   *
   * The file cache driver stores data in a file system.
   * The default path is "store/framework/cache".
   *
   * @var array
   */
  'file' => [
    'path' => storage_path('framework/cache'),
  ],


  /**
   * Redis cache configuration
   *
   * The redis cache driver stores data in a Redis database.
   * The default host is "127.0.0.1".
   * The default port is "6379".
   * The default database is "0".
   *
   * @var array
   */
  'redis' => [
    'host' => env('REDIS_HOST', '127.0.0.1'),
    'port' => env('REDIS_PORT', 6379),
    'password' => env('REDIS_PASSWORD', null),
    'database' => env('REDIS_DB', 0),
  ],

  /**
   * Memory cache configuration
   *
   * The memory cache driver stores data in memory.
   *
   * @var array
   */
  'memory' => [],

  /**
   * Array cache configuration
   *
   * The array cache driver stores data in an array.
   *
   * @var array
   */
  'array' => [],

  /**
   * Database cache configuration
   *
   * The database cache driver stores data in a database.
   *
   * @var array
   */
  'database' => [
    'connection' => env('CACHE_CONNECTION', 'default'),
    'table' => env('CACHE_TABLE', 'cache'),
  ],

  /**
   * Memcached cache configuration
   *
   * The memcached cache driver stores data in a memcached server.
   *
   * @var array
   */
  'memcached' => [
    'servers' => [
      '127.0.0.1:11211',
    ],
  ],

  /**
   * Encryption configuration
   *
   * The encryption configuration is used to encrypt the cache data.
   * The default key is a random 32-byte key.
   *
   * @var array
   */
  'encryption' => [
    'enabled' => env('CACHE_ENCRYPT', false),
    'key' => env('CACHE_KEY', 'base64:' . base64_encode(random_bytes(32))),
  ],
];
```

```php showLineNumbers
CACHE_DRIVER=file
```
The `CACHE_DRIVER` variable specifies the cache driver to use. The available options are:
- `file`: Stores cached data in files on the server.
- `array`: Stores cached data in memory (not persistent).
- `database`: Stores cached data in the database.

## Usage
You can use the `Cache` class to store and retrieve cached data. The `Cache` class provides a simple API for storing and retrieving cached data.

### Storing data
You can store data in the cache using the `put` method. The `put` method takes three parameters: the key, the value, and the expiration time (in seconds).

```php showLineNumbers
use Pocketframe\Cache\Cache;

Cache::put('key', 'value', 60);
```


The above code will store the value `value` in the cache with the key `key` for 60 seconds. After 60 seconds, the cached data will be removed from the cache.
You can also store data in the cache without specifying an expiration time. In this case, the cached data will be stored indefinitely.

```php showLineNumbers
use Pocketframe\Cache\Cache;

Cache::put('key', 'value');
```

**Example:**
```php showLineNumbers
<?php
namespace App\Controllers\Web;
use Pocketframe\Cache\Cache;
use Pocketframe\Database\QueryEngine;
use App\Entities\Category;
use Pocketframe\Http\Response\Response;
use Pocketframe\Http\Request\Request;

class CacheController
{
    public function index()
    {
        Cache::put('key', 'value');
    }
}
```

### Retrieving data
You can retrieve data from the cache using the `get` method. The `get` method takes one parameter: the key.

```php showLineNumbers
use Pocketframe\Cache\Cache;

$value = Cache::get('key');
```
The above code will retrieve the value stored in the cache with the key `key`. If the key does not exist in the cache, the `get` method will return `null`.

### Checking if a key exists
You can check if a key exists in the cache using the `has` method. The `has` method takes one parameter: the key.

```php showLineNumbers
use Pocketframe\Cache\Cache;

if(Cache::has('key')) {
    // The key exists in the cache
} else {
    // The key does not exist in the cache
}
```
The above code will return `true` if the key `key` exists in the cache, and `false` otherwise.



### Retrieve and Store

Sometimes you may wish to retrieve an item from the cache, but also store a default value if the requested item doesn't exist. For example, you may wish to retrieve all users from the cache or, if they don't exist, retrieve them from the database and add them to the cache. You may do this using the Cache::remember method:

**Example:**
```php showLineNumbers
public function index()
{
    $categories = Cache::remember('categories', 60, function () {
        return QueryEngine::for(Category::class)
            ->get();
    });
}
```

You may use the rememberForever method to retrieve an item from the cache or store it forever if it does not exist:

```php showLineNumbers
public function index()
{
    $categories = Cache::rememberForever('categories', function () {
        return QueryEngine::for(Category::class)
            ->get();
    });
}
```

The above code will retrieve the value stored in the cache with the key `categories`. If the key does not exist in the cache, the closure will be executed and the result will be stored in the cache for 60 seconds.

### Forgetting data

You can remove data from the cache using the `forget` method. The `forget` method takes one parameter: the key.

```php showLineNumbers
use Pocketframe\Cache\Cache;

Cache::forget('key');
```
The above code will remove the cached data with the key `key` from the cache. If the key does not exist in the cache, the `forget` method will do nothing.

You can also remove all cached data using the `flush` method. The `flush` method does not take any parameters.

```php showLineNumbers
use Pocketframe\Cache\Cache;

Cache::flush();
```

The above code will remove all cached data from the cache. This is useful when you want to clear the cache completely.





