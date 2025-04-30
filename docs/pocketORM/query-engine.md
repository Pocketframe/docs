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

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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

## Chunking results

### `chunk()`
The `chunk()` method retrieves a chunk of records from the database. This is useful for processing large datasets in smaller batches. The method takes two arguments: the size
of the chunk and a callback function to process each chunk.

```php showLineNumbers
<?php

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

QueryEngine::for(Category::class)
  ->chunk(100, function ($categories) {
    foreach ($categories as $category) {
      // Process each category
    }
});
```
This will retrieve 100 records at a time and pass them to the callback function. The callback function can then process each chunk of records.

### `streamEach()`
The `streamEach()` method retrieves a chunk of records from the database and passes each record to a callback function. This is useful for processing large datasets in smaller batches. The method takes two arguments: the size of the chunk and an optional array of options. The options can include `'columns'` to specify the columns to select, `'orderBy'` to specify the order of the results, and `'limit'` to specify the maximum number of records to return
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$users = QueryEngine::for(User::class)
  ->where('active', true)
  ->streamEach(50000, ['orderBy' => 'id', 'direction' => 'asc'])
  ->get();

foreach ($users as $user) {
   $user->doSomething();
}
```



## Select Statements

### `select()`
The `select()` method allows you to specify which columns to retrieve from the database. This is useful for limiting the amount of data returned.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$count = QueryEngine::for(Category::class)
  ->count();
```
This will return the total number of records in the `categories` table.

### `sum()`
The `sum()` method retrieves the sum of a specified column. This returns an integer value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$sum = QueryEngine::for(Category::class)
  ->sum('id');
```
This will return the sum of the `id` column in the `categories` table.

### `avg()`

The `avg()` method retrieves the average of a specified column. This returns a float value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$avg = QueryEngine::for(Category::class)
  ->avg('id');
```
This will return the average of the `id` column in the `categories` table.

### `max()`
The `max()` method retrieves the maximum value of a specified column. This returns an integer value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$max = QueryEngine::for(Category::class)
  ->max('id');
```
This will return the maximum value of the `id` column in the `categories` table.

### `min()`

The `min()` method retrieves the minimum value of a specified column. This returns an integer value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$min = QueryEngine::for(Category::class)
  ->min('id');
```
This will return the minimum value of the `id` column in the `categories` table.

### `exists()`

The `exists()` method checks if any records match the specified criteria. This returns a boolean value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
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
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->orWhere('name', 'Category 2')
  ->get();
```
This will retrieve all categories with the name `Category 1` or `Category 2`.


### `whereIn()`
The `whereIn()` method allows you to specify a where clause with multiple values. This method takes two arguments: the column to filter on and an array of values to filter by.

```php showLineNumbers
<?php

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->whereIn('name', ['Category 1', 'Category 2'])
  ->get();
  ```

  This will retrieve all categories with the name `Category 1` or `Category 2`.

### `orWhereIn()`
The `orWhereIn()` method allows you to specify an "or" where clause with multiple values. This method takes two arguments: the column to filter on and an array of values to filter by.

```php showLineNumbers
<?php

use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->orWhereIn('name', ['Category 2', 'Category 3'])
  ->get();
  ```
  This will retrieve all categories with the name `Category 1` or `Category 2` or `Category 3`.

  ### `whereNot` and `orWhereNot` clauses

  The `whereNot()` and `orWhereNot()` methods allow you to specify a where clause with a NOT operator. This method takes two arguments: the column to filter on and the value to filter by.
  ```php showLineNumbers
  <?php

  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereNot('name', 'Category 1')
  ->orWhereNot('name', 'Category 2')
  ->get();
  ```
  This will retrieve all categories with the name `Category 1` or `Category 2`.

  ### `whereNull` and `orWhereNull` clauses

  The `whereNull()` and `orWhereNull()` methods allow you to specify a where clause with a NULL value. This method takes one argument: the column to filter on.

  ```php showLineNumbers
  <?php

  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereNull('name')
  ->orWhereNull('slug')
  ->get();
  ```
  This will retrieve all categories with a NULL value for the `name` column.

  ### `whereColumn` and `orWhereColumn` clauses

  The `whereColumn()` and `orWhereColumn()` methods allow you to specify a where clause with a column comparison. This method takes three arguments: the first column to compare, the comparison operator and the second column to compare

  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereColumn('name', '=', 'slug')
  ->get();
  ```
  This will retrieve all categories where the `name` column is equal to the `slug` column.

  You can also apply an `orWhereColumn()` clause to the same query.
  ```php showLineNumbers
  <?php

  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->orWhereColumn('created_at', '=', 'updated_at')
  ->get();
  ```
This will retrieve all categories where the `created_at` column is equal to the `updated_at` column.

### `whereContainsJson` and `orWhereContainsJson` clauses

The `whereContainsJson()` and `orWhereContainsJson()` methods allow you to specify a where clause with a JSON column. This method takes two arguments: the column to filter on and the value to filter by. The value can either be an string or an array.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Setting;

$categories = QueryEngine::for(Setting::class)
  ->whereContainsJson('preferences->notifications', ['email', 'sms'])
  ->get();
  ```

  This will retrieve all categories where the `preferences->notifications` column contains the values `email` and `sms`.

  You can also apply an `orWhereContainsJson()` clause to the same query.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Setting;

  $categories = QueryEngine::for(Setting::class)
  ->where('name', 'Acme Inc')
  ->orWhereContainsJson('preferences->notifications', ['email', 'sms'])
  ->get();
  ```

  ### `whereAny`, `whereAll` and `whereNone` clauses

  The `whereAny()`, `whereAll()` and `whereNone()` methods allow you to specify a where clause with an array of columns to filter on. This method takes takes three arguments: the columns to filter on, the operator and the value to filter by.

#### whereAny()
The `whereAny()` method allows you to specify an array of columns to filter on. This method takes takes three arguments: the columns to filter on, the operator and the value to filter by

  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereAny(['name', 'slug'], '=', 'pocketframe')
  ->get();
  ```
  This will retrieve all categories where the `name` or `slug` column contains the value `pocketframe`.

  You can also apply an `orWhereAny()` clause to the same query.

  #### whereAll()
  The `whereAll()` method allows you to specify a where clause with an array of columns to filter on. This method takes takes three arguments: the columns to filter on, the operator and the value to filter by.

  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereAll(['name', 'slug'], '=', 'pocketframe')
  ->get();
  ```

  This will retrieve all categories where the `name` and `slug` column contains the value `pocketframe`.

  You can also apply an `orWhereAll()` clause to the same query.

  #### whereNone()
  The `whereNone()` method allows you to specify a where clause with an array of columns to filter on. This method takes takes three arguments: the columns to filter on, the operator and the value to filter by.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereNone(['name', 'slug'], '=', 'pocketframe')
  ->get();
  ```
  This will retrieve all categories where the `name` and `slug` column does not contain the value `pocketframe`.

  ### `wherLike()` and `orWhereLike()` clauses

  The `whereLike()` and `orWhereLike()` methods allow you to specify a where clause with a LIKE operator. This method takes two arguments: the column to filter on and the value to filter by.

  ```php showLineNumbers
  <?php

  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereLike('name', '%category%')
  ->get();
  ```

  This will retrieve all categories where the `name` column contains the value `category`.

  :::tip
  You can also pass an optional third argument to the `whereLike()` method to set the sensitivity of the LIKE operator. The default is `false`, which means the LIKE operator is case-sensitive. You can set it to `true` to make the LIKE operator case-insensitive.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereLike('name', '%category%', true)
  ->get();
  ```
  :::

  You can also apply an `orWhereLike()` clause to the same query. This method takes two arguments: the column to filter on and the value to filter by.
  ```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->orWhereLike('name', '%category%')
  ->get();
  ```

### `whereBetween()` and `orWhereBetween()` clauses

The `whereBetween()` and `orWhereBetween()` methods allow you to specify a where clause with a BETWEEN operator. This method takes three arguments: the column to filter on, the start value, and the end value.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->whereBetween('created_at', '2020-01-01', '2020-12-31')
  ->get();
  ```
  This will retrieve all categories where the `created_at` column is between `2020-01-01` and `2020-12-31`.

  You can also apply an `orWhereBetween()` clause to the same query. This method takes three arguments: the column to filter on, the start value, and the end value.

  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->orWhereBetween('created_at', '2020-01-01', '2020-12-31')
  ->get();
  ```
  This will retrieve all categories with the name `Category 1` or where the `created_at` column is between `2020-01-01` and `2020-12-31`.

  ### `whereNotBetween()` and `orWhereNotBetween()` clauses
  The `whereNotBetween()` and `orWhereNotBetween()` methods allow you to specify a where clause with a NOT BETWEEN operator. This method takes three arguments: the column to filter on, the start value, and the end value.
  ```php showLineNumbers
  <?php
    use Pocketframe\PocketORM\QueryEngine\QueryEngine;
    use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->whereNotBetween('created_at', '2020-01-01', '2020-12-31')
  ->get();
  ```
  This will retrieve all categories where the `created_at` column is not between `2020-01-01` and `2020-12-31`.

  You can also apply an `orWhereNotBetween()` clause to the same query. This method takes three arguments: the column to filter on, the start value, and the end value.

  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->where('name', 'Category 1')
  ->orWhereNotBetween('created_at', '2020-01-01', '2020-12-31')
  ->get();
  ```
  This will retrieve all categories with the name `Category 1` or where the `created_at` column is not between `2020-01-01` and `2020-12-31`.

  ### `whereBetweenCoolumn()` and `orWhereBetweenColumn()` clauses
  The `whereBetweenColumn()` and `orWhereBetweenColumn()` methods allow you to specify a where clause with a BETWEEN operator between two columns. This method takes three arguments: the column to filter on, the start column, and the end column.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Event;

  $events = QueryEngine::for(Event::class)
    ->whereBetweenColumn('event_date', 'start_date', 'end_date')
    ->get();
  ```
  This will retrieve all events where the `event_date` column is between the `start_date` and `end_date` columns.

  You can also apply an `orWhereBetweenColumn()` clause to the same query. This method takes three arguments: the column to filter on, the start column, and the end column.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Event;

  $events = QueryEngine::for(Event::class)
  ->where('name', 'Event 1')
  ->orWhereBetweenColumn('event_date', 'start_date', 'end_date')
  ->get();
  ```
  This will retrieve all events with the name `Event 1` or where the `event_date` column is between the `start_date` and `end_date` columns.

### `whereDate()`, `whereMonth()`, `whereDay()` and `whereYear()` clauses
These methods allow you to specify a where clause with a date comparison.

#### `whereDate()`
The `whereDate()` method allows you to specify a where clause with a date comparison. This method takes three arguments: the column to filter on, the operator and the date to compare against.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereDate('event_date', '=', '2020-01-01')
  ->get();
  ```
  This will retrieve all events where the `event_date` column is equal to `2020-01-01`.

#### `whereMonth()`
The `whereMonth()` method allows you to specify a where clause with a month comparison. This method takes three arguments: the column to filter on, operator and the month to compare against.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereMonth('event_date', '=', '01')
  ->get();
```
This will retrieve all events where the `event_date` column is in January.

#### `whereDay()`
The `whereDay()` method allows you to specify a where clause with a day comparison. This method takes three arguments: the column to filter on, operator and the day to compare against.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereDay('event_date', '=', '01')
  ->get();
```
This will retrieve all events where the `event_date` column is on the 1st of the month.

#### `whereYear()`
The `whereYear()` method allows you to specify a where clause with a year comparison. This method takes three arguments: the column to filter on, operator and the year to compare against.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereYear('event_date', '=', '2020')
  ->get();
```
This will retrieve all events where the `event_date` column is in the year 2020.


### `whereTime()`, `whereToday()`, `whereYesterday()`, `whereTomorrow()` and `whereNow()` clauses

These methods allow you to specify a where clause with a time comparison.

#### `whereTime()`
The `whereTime()` method allows you to specify a where clause with a time comparison. This method takes three arguments: the column to filter on, operator and the time to compare against.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereTime('created_at', '>=', '12:00:00')
  ->get();
```

This will retrieve all events where the `created_at` column is greater or equal to `12:00:00`.

#### `whereToday()`
The `whereToday()` method allows you to specify a where clause with a today comparison. This method takes an argument: the column to filter on.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereToday('created_at')
  ->get();
```
This will retrieve all events where the `created_at` column is today.

#### `whereYesterday()`
The `whereYesterday()` method allows you to specify a where clause with a yesterday comparison. This method takes an argument: the column to filter on.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereYesterday('created_at')
  ->get();
```
This will retrieve all events where the `created_at` column is yesterday.

#### `whereTomorrow()`
The `whereTomorrow()` method allows you to specify a where clause with a tomorrow comparison. This method takes an argument: the column to filter on.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereTomorrow('created_at')
  ->get();
```
This will retrieve all events where the `created_at` column is tomorrow.

#### `whereNow()`
The `whereNow()` method allows you to specify a where clause with a now comparison. This method takes an argument: the column to filter on.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereNow('created_at')
  ->get();
```
This will retrieve all events where the `created_at` column is now.

### `whereBefore()`,  `whereAfter()` clauses
These methods allow you to specify a where clause with a before or after comparison.

#### `whereBefore()`
The `whereBefore()` method allows you to specify a where clause with a before comparison. This method takes two arguments: the column to filter on and the date to compare against.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereBefore('created_at', '2020-01-01')
  ->get();
```
This will retrieve all events where the `created_at` column is before `2020-01-01`.

#### `whereAfter()`
The `whereAfter()` method allows you to specify a where clause with a after comparison. This method takes two arguments: the column to filter on and the date to compare against.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Event;

$events = QueryEngine::for(Event::class)
  ->whereAfter('created_at', '2020-01-01')
  ->get();
```
This will retrieve all events where the `created_at` column is after `2020-01-01`.

## Grouping Queries (Logical Grouping)
There are times when you may need to group multiple queries together within parentheses and then apply a logical operator to the entire group of queries. You may use the `whereGroup()` method to accomplish this.

### `whereGroup()` and `orWhereGroup()` methods
The `whereGroup()` and `orWhereGroup()` methods allow you to group multiple queries together within parentheses and then apply a logical operator to the entire group of queries. These methods take one argument: the closure that contains the queries to be grouped.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->where('title', 'Nicknack')
  ->whereGroup(function (QueryEngine $query) {
    $query->where('author', 'John Doe')
          ->orWhere('author', 'Jane Doe');
  })
  ->get();

/*
  SQL:

  SELECT * FROM posts WHERE title = 'Nicknack' AND (author = 'John Doe' OR author = 'Jane Doe');
*/
```

The `orWhereGroup()` method is similar to the `whereGroup()` method, but it applies a logical OR operator to the entire group of queries.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->where('title', 'Nicknack')
  ->orWhereGroup(function (QueryEngine $query) {
    $query->where('author', 'John Doe')
          ->whereDate('created_at', '=', '2020-01-01');
  })
  ->get();

  /*
  SQL:

  SELECT * FROM posts WHERE title = 'Nicknack' OR (author = 'John Doe' AND created_at = '2020-01-01');
  */
```

## Advanced Querying

### `whereExists()`, `orWhereExists()` and `whereNotExists()` clauses

The `whereExists()`, `orWhereExists()` and `whereNotExists()` methods allow you to specify a where clause with an exists comparison.

#### `whereExists()`
The `whereExists()` method allows you to specify a where clause with an exists comparison. This method takes one argument: the closure that contains the subquery to be executed.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->whereExists(function (QueryEngine $query) {
    $query->select('id')
    ->from('comments')
    ->whereColumn('comments.post_id', 'posts.id')
    ->where('comments.approved', true);
  })
  ->get();
/*
  SQL:

  SELECT * FROM posts WHERE EXISTS (SELECT id FROM comments WHERE comments.post_id = posts.id AND comments.approved = true);
*/
```
#### `orWhereExists()`

The `orWhereExists()` method allows you to specify a where clause with an exists comparison. This method takes one argument: the closure that contains the subquery to be executed.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->where('title', 'Nicknack')
  ->orWhereExists(function (QueryEngine $query) {
    $query->select('id')
    ->from('comments')
    ->whereColumn('comments.post_id', 'posts.id')
    ->where('comments.approved', true);
  })
  ->get();

  /*
  SQL:

  SELECT * FROM posts WHERE title = 'Nicknack' OR EXISTS (SELECT id FROM comments WHERE comments.post_id = posts.id AND comments.approved = true);
  */
```

#### `whereNotExists()`
The `whereNotExists()` method allows you to specify a where clause with an exists comparison. This method takes one argument: the closure that contains the subquery to be executed.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Post;

$posts = QueryEngine::for(Post::class)
  ->where('title', 'Nicknack')
  ->whereNotExists(function (QueryEngine $query) {
    $query->select('id')
    ->from('comments')
    ->whereColumn('comments.post_id', 'posts.id')
    ->where('comments.approved', true);
  })
  ->get();
  /*
  SQL:
  SELECT * FROM posts WHERE title = 'Nicknack' AND NOT EXISTS (SELECT id FROM comments WHERE comments.post_id = posts.id AND comments.approved = true);
  */
```

### Subqueries
Subqueries can be used to create more complex queries. You can use the `selectSub()` and `fromSub()` methods to create a subquery. They both take two arguments: the alias for the subquery and the closure or query that contains the subquery.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Post;

$users = (new QueryEngine('user_stats'))
  ->fromSub('user_stats', function($q) {
      // Subquery: from "users" table
      $q->from('users')
        ->select([
            'id',
            'name',
            // Subquery column: total_posts
            fn($q2) => $q2->selectSub('total_posts', function($sq) {
                $sq->from('posts')
                    ->selectRaw('COUNT(*)')
                    ->whereColumn('user_id', 'users.id');
            }),
            // Subquery column: published_posts
            fn($q2) => $q2->selectSub('published_posts', function($sq) {
                $sq->from('posts')
                    ->selectRaw('COUNT(*)')
                    ->whereColumn('user_id', 'users.id')
                    ->where('status', '=', 'published');
            }),
        ]);
  })
  ->where('user_stats.total_posts', '>', 0)
  ->get();

/*
SELECT * FROM (
  SELECT
      id,
      name,
      (SELECT COUNT(*) FROM posts WHERE user_id = users.id) AS total_posts,
      (SELECT COUNT(*) FROM posts WHERE user_id = users.id AND status = 'published') AS published_posts
  FROM users
) AS user_stats
WHERE user_stats.total_posts > 0
*/

```

:::tip
Writing efficient and performant subqueries is essential for scalable applications. I have outlined best practices and tips to ensure your subqueries in SQL (and via QueryEngine) are as efficient as possible.

- **Prefer JOINs Over Subqueries When Possible**:

  Many subqueries can be rewritten as JOINs, which are often more efficient because the database optimizer can better combine and filter rows.

- **Use EXISTS/NOT EXISTS for Existence Checks**:

  EXISTS is usually faster than IN for checking if related rows exist because it can stop at the first match.

- **Avoid Correlated Subqueries in SELECT When Possible**
  Correlated subqueries (those that reference outer query columns) in SELECT can be slow if the outer query returns many rows.
  If possible, use JOINs with GROUP BY and aggregate functions.

- **Index the Right Columns**:

  Ensure that columns used in subquery WHERE, JOIN, or ON conditions are indexed (e.g., foreign keys).
  Example: If you subquery on orders.user_id, make sure orders.user_id is indexed.

- **Limit Subquery Columns**:

  Only select the columns you need in subqueries (e.g., SELECT 1 or SELECT COUNT(*) instead of SELECT *).
  This reduces memory and processing overhead.

- **Use Derived Tables for Complex Aggregations**:

  Sometimes, a derived table (fromSub) is the best way to precompute aggregates or filtered sets, especially if you need to join them to other tables.

- **Beware of N+1 Query Problems**:

  Avoid running a subquery for each row in a large result set (e.g., in a loop).
  Instead, use a single query with JOINs or IN/EXISTS.
  :::

  ## Ordering, Limit, Offset and Grouping
  The `orderBy()`, `limit()`, `offset()` and `groupBy()` methods allow you to control the order, limit, offset and group the results of a query.

  ### `orderBy()`
  The `orderBy()` method allows you to specify the column to order by. This is useful for sorting the results of a query. You can also specify the direction of the order by using the `byAsc()` and `byDesc()` methods. The `orderBy()` method takes two arguments: the column to order by and the direction of the order by.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->orderBy('name', 'desc')
  ->get();
  ```

  This will order the results by the `name` column in descending order.

  :::info
  You can use byAsc() and byDesc() methods to specify the direction of the order by. These methods take one argument: the column to order by.
  ```php showLineNumbers
  <?php
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;
  use App\Entities\Category;

  $categories = QueryEngine::for(Category::class)
  ->byAsc('id')
  ->get();

  $categories = QueryEngine::for(Category::class)
  ->byDesc('created_at')
  ->get();
  ```
  :::

### `orderByRaw()`
You can also use the `orderByRaw()` method to specify raw SQL expressions in your order by statement. This is useful for ordering by a column that is not in the table. The `orderByRaw()` method takes one argument: the raw SQL expression to order by.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->orderByRaw('RAND()')
->get();
```
This will order the results by a random column.

### `randomOrder()`
You can also use the `randomOrder()` method to order the results by a random column. This is useful for shuffling the results of a query.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->randomOrder()
->get();
```

This will order the results by a random column.

### `latest()`
You can also use the `latest()` method to order the results by the latest column. This is useful for ordering the results by the latest column.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->latest('created_at')
->get();
```
This will order the results by the `created_at` column in descending order.

### `oldest()`
You can also use the `oldest()` method to order the results by the oldest column. This is useful for ordering the results by the oldest column.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->oldest('created_at')
->get();
```
This will order the results by the `created_at` column in ascending order.

### `limit()`
The `limit()` method allows you to specify the maximum number of records to return. This is useful for limiting the number of records returned by a query. The `limit()` method takes one argument: the maximum number of records to return.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->limit(10)
->get();
```
This will return the first 10 records in the `categories` table.

### `take()`
The `take()` method allows you to specify the number of records to return. This is useful for limiting the number of records returned by a query. The `take()` method takes one argument: the number of records to return.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->take(10)
->get();
```

This will return the first 10 records in the `categories` table.

### `offset()`
The `offset()` method allows you to specify the number of records to skip. This is useful for skipping a certain number of records before returning the results of a query. The `offset()` method takes one argument: the number of records to skip.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->limit(10)
->offset(10)
->get();
```
This will return the next 10 records in the `categories` table.

### `skip()`
The `skip()` method allows you to specify the number of records to skip. This is useful for skipping a certain number of records before returning the results of a query. The `skip()` method takes one argument: the number of records to skip.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->limit(10)
->skip(10)
->get();
```
This will return the next 10 records in the `categories` table.

### `groupBy()`
The `groupBy()` method allows you to group the results of a query by a specified column. This is useful for grouping the results of a query by a specified column. The `groupBy()` method takes one argument: the column to group by.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->groupBy('name')
->get();
```
This will group the results of the query by the `name` column.

### `having()`
The `having()` method allows you to specify a HAVING clause for the query. This is useful for filtering the results of a query by a specified column. The `having()` method takes one argument: the column to filter by.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->groupBy('name')
->having('name', '=', 'John')
->get();
```
This will filter the results of the query by the `name` column and return only the records where the `name` column is equal to `John`.


## Conditional clauses
Conditional clauses is a way to add conditions to your queries. These conditions are used to filter the results of a query based on certain criteria or to modify the results of a query based on certain criteria.

### `when()`
The `when()` method allows you to specify a condition for the query. This is useful for filtering the results of a query based on certain criteria. The `when()` method takes two arguments: the condition to check and the callback to execute if the condition is true.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->when(true, function ($query) {
  $query->where('name', '=', 'John');
})
->get();
```
This will filter the results of the query by the `name` column and return only the records where the `name` column is equal to `John`.

### `whereIf()` and `orWhereIf()`
The `whereIf()` method allows you to specify a condition for the query. This is useful for filtering the results of a query based on certain criteria. The `whereIf()` method takes two arguments: the condition to check and the callback to execute if the condition is true.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->whereIf($isAdmin, 'role', '=', 'admin')
->get();

$categories = QueryEngine::for(Category::class)
  ->whereIf($isActive, function($q) {
    $q->where('status', 'active')
      ->orWhere('status', 'pending');
  })
->get();
```
This will filter the results of the query by the `name` column and return only the records where the `name` column is equal to `John`.

### `whereHas()`
The `whereHas()` method allows you to specify a condition for the query. This is useful for filtering the results of a query based on certain criteria. The `whereHas()` method takes two arguments: the condition to check and the callback to execute if the condition is true.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->whereHas('posts', function ($query) {
  $query->where('title', '=', 'John');
})
->get();
```

### `whereDoesntHave()`
The `whereDoesntHave()` method allows you to specify a condition for the query. This is useful for filtering the results of a query based on certain criteria. The `whereDoesntHave()` method takes two arguments: the condition to check and the callback to execute if the condition is true.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
  ->whereDoesntHave('posts', function ($query) {
    $query->where('title', '=', 'John');
  })
->get();
```

## Pagination
The Query Engine also provides a way to paginate the results of a query. This is useful for displaying a large number of records in a paginated manner. The Query Engine provides a `paginate()` and `cursorPaginate()` methods to paginate the results of a query.

:::info
To read more about pagination, please read the [Pagination](/docs/pocketORM/pagination.md) documentation. This will give a better understanding of how to use pagination with the Query Engine.
:::
### `paginate()`
The `paginate()` method allows you to paginate the results of a query. This is useful for displaying a large number of records in a paginated manner. You can pass optional arguments to the `paginate()` method to customize the pagination. These include `$perPage` and `$page` arguments.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->paginate(10);
```
This will paginate the results of the query by 10 records per page. In your pocket views you can use the `@paginate($categories)` directive to display the pagination links and other information.

### `cursorPaginate()`
The `cursorPaginate()` method allows you to paginate the results of a query. This is useful for displaying a large number of records in a paginated manner. This type of pagination will return a cursor that will just return the next page of records.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->cursorPaginate(10);
```
This will paginate the results of the query by 10 records per page. In your pocket views you can use the `@paginate($categories)` directive to display the pagination links and other information.

:::tip
The `@paginate()` directive will take the `$categories` variable and display the pagination links and other information and an optional css framework to render the pagination styling. Available css frameworks include `tailwind` and `bootstrap`.
:::

## Insert Records

### `insert()`

The `insert()` method allows you to insert a record into the database. This is useful for inserting a record into the database. The `insert()` method takes an array of data to insert into the database. The array should be in the format of `[column => value]`.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->insert([
  'name'        => 'Science',
  'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
]);
```

### `insertOrIgnore()`
The `insertOrIgnore()` method allows you to insert a record into the database or ignore it if it already exists. This is useful for inserting a record into the database if it does not already exist. The `insertOrIgnore()` method takes an array of data to insert into the database. The array should be in the format of `[column => value]`.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->insertOrIgnore([
  'name'        => 'Science',
  'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
]);
```
### `insertOrReplace()`
The `insertOrReplace()` method allows you to insert a record into the database or replace it if it already exists. This is useful for inserting a record into the database if it does not already exist. The `insertOrReplace()` method takes an array of data to insert into the database. The array should be in the format of `[column => value]`.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->insertOrReplace([
  'name'        => 'Science',
  'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
]);
```

:::danger
For PostgreSQL, the `insertOrReplace()` and `insertOrIgnore()` methods requires the a second argument called `conflictColumns` which can be a string or an array. This is the column(s) that will be used to determine if the record already exists. This is not required for MySQL.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->insertOrReplace([
  'name'        => 'Science',
  'description' => 'Science is a systematic enterprise that builds and organizes knowledge'],
  ['name', 'description']);
```
:::

### `insertBatch()`
The `insertBatch()` method allows you to insert multiple records into the database. This is useful for inserting multiple records into the database. The `insertBatch()` method takes an array of arrays. Each array should be in the format of `[column => value]`.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->insertBatch([
  [
    'name'        => 'Science',
    'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
  ],
  [
    'name'        => 'Technology',
    'description' => 'Technology is the application of scientific knowledge for practical purposes',
  ]
]);
```

## Update Records
The Query Engine provides a number of methods for updating records in the database. These methods allow you to update records in the database based on various criteria.

### `update()`
The `update()` method allows you to update a record in the database. This is useful for updating a record in the database. The `update()` method takes an array of data to update the record with. The array should be in the format of `[column => value]`.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->where('id', '=', 1)
->update([
  'name'        => 'Science',
  'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
]);
```

### `updateOrInsert()`
The `updateOrInsert()` method allows you to update a record in the database or insert it if it does not already exist. This is useful for updating a record in the database if it already exists. The `updateOrInsert()` method takes an array of data to update the record with. The array should be in the format of `[column => value]`.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->where('id', '=', 1)
->updateOrInsert([
  'name'        => 'Science',
  'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
]);
```
If the record already exists, it will be updated. If the record does not exist, it will be inserted.

### `updateBatch()`
The `updateBatch()` method allows you to update multiple records in the database. This is useful for updating multiple records in the database. The `updateBatch()` method takes an array of arrays. Each array should be in the format of `[column => value]`.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$categories = QueryEngine::for(Category::class)
->updateBatch([
  [
    'id'          => 1,
    'name'        => 'Science',
    'description' => 'Science is a systematic enterprise that builds and organizes knowledge',
  ],
  [
    'id'          => 2,
    'name'        => 'Technology',
    'description' => 'Technology is the application of scientific knowledge for practical purposes',
  ]
  ]);
```

## Delete Records

### `delete()`

The Query Engine supports deleting records from the database. If this methods is called it will delete all records that match the criteria.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->where('id', '=', 1)
->delete();
```

## Debugging
The Query Engine provides a number of methods for debugging queries. These methods allow you to understand what is happening with the query.

### `toSql()`
The `toSql()` method allows you to see the SQL query that will be executed. This is useful for debugging queries.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->where('id', '=', 1)
->toSql();
```
When this method is called, it will return the SQL query that will be executed.

### `bindSql()`
The `bindSql()` method allows you to see the SQL query that will be executed, with the values bound to the query. This is useful for debugging queries.
```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

$category = QueryEngine::for(Category::class)
->where('id', '=', 1)
->bindSql();
```
When this method is called, it will return the SQL query that will be executed, with the values bound to the query.

### Enabling Debugging
You can enable debugging on a query by starting a debugger session. This will allow you to see the SQL query that will be executed, with the values bound to the query, memory usage, and execution time. This is important for understanding what is happening with the query.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;

QueryEngine::enableQueryLog();
  $categories = QueryEngine::for(Category::class)
    ->distinct()
    ->select(['id', 'category_name'])
    ->include('tags')
    ->get();
$log = QueryEngine::getQueryLog();

dd($log);

/*
1 array:3 [▼
  0 => array:5 [▼
    "sql" => "SELECT DISTINCT `id`, `category_name` FROM `categories` WHERE `trashed_at` IS NULL"
    "bindings" => []
    "memory" => "484008 bytes"
    "peak_memory" => "534176 bytes"
    "total_time" => 1745901420.7852
  ]
  1 => array:5 [▼
    "sql" => "SELECT * FROM `category_tags` WHERE `category_id` IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    "bindings" => array:11 [▶]
    "memory" => "497480 bytes"
    "peak_memory" => "594296 bytes"
    "total_time" => 1745901420.7899
  ]
  2 => array:5 [▼
    "sql" => "SELECT * FROM `tags` WHERE `id` IN (?, ?, ?, ?, ?, ?, ?, ?)"
    "bindings" => array:8 [▶]
    "memory" => "507824 bytes"
    "peak_memory" => "594296 bytes"
    "total_time" => 1745901420.7968
  ]
]
*/
```
By doing this, you can see the SQL query that will be executed, with the values bound to the query, memory usage, and execution time. This is important for understanding what is happening with the query.







