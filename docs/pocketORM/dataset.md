---
sidebar_position: 25
---
# Dataset

## Introduction

The `Pocketframe\PocketORM\Essentials\DataSet` class is a collection of `Pocketframe\PocketORM\Entity\Entity` objects. It is used to represent a collection of records fetched from the database. It is an iterable object, so you can use it in a `foreach` loop. DataSet is a wrapper around an array of entities and has number of methods to manipulate the data. All dataset methods can be called on top of the QueryEngine methods.

:::info
If you want to learn more about the QueryEngine, you can read the [QueryEngine documentation](/docs/pocketORM/query-engine.md).
:::

## Available Methods
Dataset provides a number of methods to manipulate the data.

### `all()`
The `all()` method returns all the records from the dataset as an array.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

class CategoryController
{
  /**
   *  Display a listing of the resource.
   */
  public function index(Request $request): Response
  {
    $categories = QueryEngine::for(Category::class)
    ->get()
    ->all();

    return Response::view('admin.categories.index', [
      'categories' => $categories
    ]);

}
```
### `toArray()`
The `toArray()` method returns the dataset as an array. The `toArray()` method is useful when you want to convert the dataset to an array.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->toArray();
  ```

### `first()`
The `first()` method returns the first record from the dataset.

```php showLineNumbers
<?php

use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)
  ->first();
  ```

### `last()`
The `last()` method returns the last record from the dataset.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)
  ->last();
  ```

### `map()`
The `map()` method returns an array of the results of calling a callback function on each element of the dataset. The `map()` method is useful when you want to transform the data in the dataset.

```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->map(function ($category) {
    return strtoupper($category->name);
  });
```

### `filter()`

The `filter()` method returns a new dataset containing only the elements that pass the test implemented by the provided function. The `filter()` method is useful when you want to filter the data in the dataset.

```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->filter(function ($category) {
    return $category->category_name === 'Bridget Watsica';
});
```
### `reduce()`

The `reduce()` method applies a function against an accumulator and each element in the dataset (from left to right) to reduce it to a single value. The `reduce()` method is useful when you want to reduce the data in the dataset to a single value.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$total = QueryEngine::for(Category::class)
  ->get()
  ->reduce(function ($total, $category) {
    return $total + $category->id;
 }, 0);
 ```

 ### `groupBy()`
 The `groupBy()` method groups the elements of the dataset by the specified key. The `groupBy()` method is useful when you want to group the data in the dataset by a specific key.
 ```php showLineNumbers
 <?php
  use App\Entities\Category;
  use Pocketframe\PocketORM\QueryEngine\QueryEngine;

  $categories = QueryEngine::for(Category::class)
  ->get()
  ->groupBy(function($category){
    return $category->category_name;
  });
  ```

### `partition()`
The `partition()` method partitions the dataset into two arrays, based on a predicate function. The `partition()` method is useful when you want to partition the data in the dataset.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->partition(function ($category) {
    return $category->id === 3;
});
```
### `pluck()`
The `pluck()` method returns an array of the values of a single field from the dataset. The `pluck()` method is useful when you want to get the values of a single field from the dataset.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->pluck('id');
  ```

### `sort()`
The `sort()` method sorts the dataset in ascending order by the specified key. The `sort()` method is useful when you want to sort the data in the dataset. It does not modify the original DataSet; instead, it returns a new, sorted DataSet.

```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->sort(function ($a, $b) {
    return $b->id <=> $a->id;
  });

 foreach ($categories as $category) {
   echo $category->category_name;
 }
  ```
:::info
This function assigns new keys to the elements in array. It will remove any existing keys that may have been assigned, rather than just reordering the keys.
:::

:::danger
Returning non-integer values from the comparison function, such as float, will result in an internal cast to int of the callback's return value. So values such as 0.99 and 0.1 will both be cast to an integer value of 0, which will compare such values as equal.
:::

### `count()`
The `count()` method returns the number of elements in the dataset. The `count()` method is useful when you want to get the number of elements in the dataset.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->count();
  ```
### `sum()`
The `sum()` method returns the sum of the values in the dataset. The `sum()` method is useful when you want to get the sum of the values in the dataset.
```php showLineNumbers
<?php
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->get()
  ->sum('id');
```








