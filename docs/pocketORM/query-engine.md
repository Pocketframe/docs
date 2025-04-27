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

### `findOrFail()`

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

### `pluck()`
The `pluck()` method retrieves a single column from the database. This returns an array of values for the specified column.

```php showLineNumbers
<?php
$category = QueryEngine::for(Category::class)
            ->pluck('name');

  // ['Category 1', 'Category 2', 'Category 3']
  ```

### Chunking results

The `chunk()` method retrieves a chunk of records from the database. This is useful for processing large datasets in smaller batches. The method takes two arguments: the size of the chunk and a callback function to process each chunk.

```php showLineNumbers
<?php

use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

QueryEngine::for(Category::class)
  ->chunk(100, function ($categories) {
    foreach ($categories as $category) {
      // Process each category
    }
});
```
This will retrieve 100 records at a time and pass them to the callback function. The callback function can then process each chunk of records.

## Select Statements

### `select()`
The `select()` method allows you to specify which columns to retrieve from the database. This is useful for limiting the amount of data returned.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->select(['id', 'name'])
  ->get();
```
This will retrieve only the `id` and `name` columns from the `categories` table.

### `selectRaw()`
You can also use the `selectRaw()` method to specify raw SQL expressions in your select statement.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->selectRaw('id, name, COUNT(*) as count')
  ->groupBy('id')
  ->get();
```
This will retrieve the `id`, `name`, and a count of records for each `id` from the `categories` table, grouped by `id`.

### `distinct()`

The `distinct()` method allows you to retrieve only unique records from the database. This is useful for eliminating duplicate records.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->distinct()
  ->get();
```
This will retrieve only unique records from the `categories` table.

## Aggregates

The `count()` method retrieves the number of records that match the specified criteria. This returns an integer value.

```php showLineNumbers
<?php

use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$count = QueryEngine::for(Category::class)
  ->count();
```
This will return the total number of records in the `categories` table.

### `sum()`
The `sum()` method retrieves the sum of a specified column. This returns an integer value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$sum = QueryEngine::for(Category::class)
  ->sum('id');
```
This will return the sum of the `id` column in the `categories` table.

### `avg()`

The `avg()` method retrieves the average of a specified column. This returns a float value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$avg = QueryEngine::for(Category::class)
  ->avg('id');
```
This will return the average of the `id` column in the `categories` table.

### `max()`
The `max()` method retrieves the maximum value of a specified column. This returns an integer value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$max = QueryEngine::for(Category::class)
  ->max('id');
```
This will return the maximum value of the `id` column in the `categories` table.

### `min()`

The `min()` method retrieves the minimum value of a specified column. This returns an integer value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$min = QueryEngine::for(Category::class)
  ->min('id');
```
This will return the minimum value of the `id` column in the `categories` table.

### `exists()`

The `exists()` method checks if any records match the specified criteria. This returns a boolean value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$exists = QueryEngine::for(Category::class)
  ->where('id', 1)
  ->exists();
```
This will return `true` if any records match the criteria, or `false` if no records are found.

### `doesntExist()`

The `doesntExist()` method checks if no records match the specified criteria. This returns a boolean value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$doesntExist = QueryEngine::for(Category::class)
  ->where('id', 1)
  ->doesntExist();
```
This will return `true` if no records match the criteria, or `false` if any records are found.



## Joins
Joins allow you to combine records from multiple tables based on a related column. The query engine supports various types of joins, including `INNER JOIN`, `LEFT JOIN`, and `RIGHT JOIN`.

### `join()`

The `join()` method allows you to perform an inner join between two tables. This is useful for combining records from multiple tables based on a related column. The join method takes five arguments: the name of the table to join, the local column to join on, the operator to use for the join, the foreign column to join on, and the type of join to perform. By default, the join type is `INNER JOIN`, but you can specify other types of joins such as `LEFT JOIN` or `RIGHT JOIN`.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->join('categories', 'posts.category_id', '=', 'categories.id')
  ->select(['posts.id', 'posts.title', 'categories.category_name'])
  ->get();

  Output:
  /*
   [
     ['id' => 1, 'title' => 'Post 1', 'category_name' => 'Category 1'],
     ['id' => 2, 'title' => 'Post 2', 'category_name' => 'Category 2'],
     ['id' => 3, 'title' => 'Post 3', 'category_name' => 'Category 3'],
   ]
  */
```
This will retrieve all posts along with their associated category names by performing an inner join between the `posts` and `categories` tables.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->join('categories', 'posts.category_id', '=', 'categories.id', 'LEFT')
  ->select(['posts.id', 'posts.title', 'categories.category_name'])
  ->get();

  Output:
  /*
  [
    ['id' => 1, 'title' => 'Post 1', 'category_name' => 'Category 1'],
    ['id' => 2, 'title' => 'Post 2', 'category_name' => 'Category 2'],
    ['id' => 3, 'title' => 'Post 3, 'category_name' => null],
  ]
  */
```
This will retrieve all posts along with their associated category names by performing a left join between the `posts` and `categories` tables. If a post does not have an associated category, the `category_name` will be `null`.

## Where Clauses

QueryEngine provides a fluent interface for building complex where clauses. You can chain multiple where clauses together using various methods. Here are some examples:

### `where()`

The `where()` method allows you to specify a simple where clause. This method takes two arguments: the column to filter on and the value to filter by.
```php showLineNumbers
<?php

use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->get();
```
This will retrieve all categories with the name `Category 1`.

### `orWhere()`

The `orWhere()` method allows you to specify an "or" where clause. This method takes two arguments: the column to filter on and the value to filter by.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\Database\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->orWhere('name', 'Category 2')
  ->get();
```
This will retrieve all categories with the name `Category 1` or `Category 2`.



