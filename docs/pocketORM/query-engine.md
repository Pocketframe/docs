---
sidebar_position: 24
---

# Query Engine

PocketORM's query engine is a powerful tool that allows you to build complex queries using a simple and intuitive syntax. It supports various query types, including `SELECT`, `INSERT`, `UPDATE`, and `DELETE`, and provides a range of options for filtering, sorting, and grouping results. The engine also provide a variety of methods for working with data, such as `where()`, `orderBy()`, `groupBy()`, and `having()`.

The query engine is designed to be flexible and extensible, allowing you to customize your queries to meet your specific needs. It also supports advanced features such as joins, subqueries, and transactions, making it a powerful tool for working with databases in PHP applications.

The engine supports multiple database systems, including MySQL, PostgreSQL, SQLite, and others. This means you can use the same query syntax across different database systems without worrying about compatibility issues.

## Query Engine Syntax

The query engine uses a fluent interface, allowing you to chain methods together to build complex queries. Each method returns the query object, enabling you to continue building the query without needing to create intermediate variables.

### Example Query

```php showLineNumbers
use PocketORM\QueryEngine;
use App\Entities\Category;

$query = QueryEngine::for(Category::class)
    ->select(['id', 'name'])
    ->where('id', 1)
    ->orderBy('name', 'asc')
    ->limit(10)
    ->get();
```
This will fetch the `id` and `name` columns from the `categories` table where the `id` is equal to 1, ordered by the `name` column in ascending order, and limited to 10 results.

The `for()` method is a static method that creates a new instance of the query engine for the specified entity. This method is used to specify the entity you want to work with, and it returns a new query engine instance.

:::tip
You can also instantiate the query engine using using the `new` keyword, but it is recommended to use the static `for()` method for better readability and maintainability.
```php showLineNumbers
use PocketORM\QueryEngine;
use App\Entities\Category;

$query = new QueryEngine(Category::class)
    ->select(['id', 'name'])
    ->where('id', 1)
    ->orderBy('name', 'asc')
    ->limit(10)
    ->get();
```
Lastly you can use the `fromEntity()` function to get the query engine for a specific entity.

```php showLineNumbers
use App\Entities\Category;

$query = fromEntity(Category::class)
    ->select(['id', 'name'])
    ->where('id', 1)
    ->orderBy('name', 'asc')
    ->limit(10)
    ->get();
```
:::

## Running and Building Queries

The query engine provides several methods for running and building queries. Here are some of the most commonly used methods.

### Retrieving all Data

The query engine provides several methods for retrieving data from the database. These methods include methods that fetch all records, a single record, or a specific column from the database.

#### `get()`

The `get()` method retrieves all records from the database that match the specified criteria. This returns a `Pocketframe\PocketORM\Essentials\DataSet` object. This object is a collection of data that can be iterated over to access the records.

```php showLineNumbers

<?php

namespace App\Controllers\Web;

use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

class CategoryController
{
    /**
     * Show a list of all categories.
     */
    public function index(): Response
    {
        // Fetch all categories from the database
        $categories = QueryEngine::for(Category::class)
            ->select(['id', 'name'])
            ->get();

        return view('category.index', compact('categories'));
    }
}
```


### `latest()`

The `latest()` method will retrievve the latest record from the database. This returns a single record object or `null` if no records are found.

```php showLineNumbers

<?php
namespace App\Controllers\Web;

use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

class CategoryController
{
    /**
     * Show the latest category.
     */
    public function index(): Response
    {
        // Fetch the latest category from the database
        $categories = QueryEngine::for(Category::class)
            ->latest();

        return view('category.show', compact('categories'));
    }
}
```

### Retrieving a Single Record

### `first()`
The `first()` method retrieves the first record from the database that matches the specified criteria. This returns a single record object or `null` if no records are found.

```php showLineNumbers
<?php
namespace App\Controllers\Web;
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

class CategoryController
{
    /**
     * Show the first category.
     */
    public function show(): Response
    {
        // Fetch the first category from the database
        $category = QueryEngine::for(Category::class)
            ->select(['id', 'name'])
            ->first();

        return view('category.show', compact('category'));
    }
}
```

### `find()`

The `find()` method retrieves a record by its primary key. This returns a single record object or `null` if no records are found.

```php showLineNumbers
<?php
namespace App\Controllers\Web;

use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

class CategoryController
{
    /**
     * Show a category by its ID.
     */
    public function show($id): Response
    {
        // Fetch a category by its ID
        $category = QueryEngine::for(Category::class)
            ->find($id);

        return view('category.show', compact('category'));
    }
}
```

### findOrFail()

The `findOrFail()` method retrieves a record by its primary key. This returns a single record object or throws an exception if no records are found.

```php showLineNumbers
<?php
namespace App\Controllers\Web;
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;
class CategoryController
{
    /**
     * Show a category by its ID.
     */
    public function show($id): Response
    {
        // Fetch a category by its ID or throw an exception if not found
        $category = QueryEngine::for(Category::class)
            ->findOrFail($id);

        return view('category.show', compact('category'));
    }
}
```




