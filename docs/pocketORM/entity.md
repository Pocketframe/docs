---
sidebar_position: 23
---

# Entities

Entities in PocketORM are the core of the ORM. They represent a table in the database, and its attributes represent the columns of that table. Each entity is defined by a class that inherits from `Entity`. The class name is used as the table name in the database, and the attributes are used as the columns.

:::info
An entity represents a row in a table, while a [dataset](/docs/pocketORM/dataset.md) represents a collection of rows. You can think of an entity as a single record in the database, while a dataset is a collection of records.
:::

## Defining an Entity
To define an entity, you need to generate using the `pocket entity:create` command.

```bash
php pocket entity:create Category
```
:::tip
You can use the `-s` option to generate a schema script for the entity, and the `-b` option to generate a blueprint for the entity.
```bash
php pocket entity:create Category -s -b
```
This will create a new `Category` entity class in the `app/Entities` directory, a schema script in the `database/schema` directory, and a blueprint in the `app/blueprints` directory.
:::
:::danger
The entity name must be in PascalCase (e.g., `BlogTag`, `BlogCategory`, etc.). The CLI will automatically convert the name to snake_case for the table name in the database.
:::


```php showLineNumbers
<?php

namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
  //
}
```

### Attributes
Attributes are the properties of the entity class that represent the columns of the table. You entity class already knows the attributes of the table, but you can also define them manually if you want. To do this, you need to define an array called `$attributes` in the entity class.

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
    public array $attributes = [
      'id'
      'name'
      'slug'
      'description'
      'created_at'
      'updated_at'
    ];
}
```

### Table Name
You may notice that the entity class does not have a table name defined. This is because the entity class automatically uses the class name as the table name in snake_case and plural form. For example, the `Category` entity will use the `categories` table in the database. How you can override this behavior by defining a `$table` property in the entity class.

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
    public string $table = 'my_categories';
}
```

This will now become the table name for the entity.


### Relationships
PocketORM supports several types of relationships between entities. You can define these relationships in the entity class by defining a relationship property.

```php showLineNumbers
<?php

namespace App\Entities;

use Pocketframe\PocketORM\Concerns\Trashable;
use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{

  protected array $relationship = [
    'posts'   => [Entity::HAS_MULTIPLE, Post::class, 'author_id'],
  ];
}
```
This will establish a one-to-many relationship between the `Category` and `Post` entities. The `posts` property will now return all the posts that belong to the category.
You can also define inverse relationships using the `ownedBy` method.

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Post extends Entity
{
  protected array $relationship = [
    'category' => [Entity::OWNED_BY, Category::class, 'category_id'],
  ];
}
```

This will establish an inverse relationship between the `Post` and `Category` entities. The `category` property will now return the category that owns the post.

:::info
We will cover relationships in more detail in the [Relationships](/docs/pocketORM/relationship.md) section.
:::

### Mass Assignment
Mass assignment is a feature that allows you to assign multiple attributes to an entity at once. This is useful for creating or updating entities. To use mass assignment, you need to define a `$fillable` property in the entity class.

Mass will only allow you to submit the attributes that are defined in the `$fillable` property. This is to prevent mass assignment of attributes that are not allowed.

:::info
This is a security feature to prevent mass assignment vulnerabilities. You should always define the `$fillable` property in your entity class to protect against mass assignment vulnerabilities.
:::

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
    protected array $fillable = [
      'name',
      'slug',
      'description',
    ];
}
```
This will allow you to assign the `name`, `slug`, and `description` attributes to the entity using mass assignment.

:::danger
You should never submit data that is not defined in the `$fillable` property. This is to prevent mass assignment vulnerabilities.
:::

```php showLineNumbers
$category = new Category([
  'name'        => 'My Category',
  'slug'        => 'my-category',
  'description' => 'This is my category.',
]);

$category->save();
```

:::info
If you know what you are doing, you can also use the `$guarded` property to specify which attributes should not be mass assignable. This is useful for protecting sensitive attributes from being mass assigned.

```php showLineNumbers
<?php
namespace App\Entities;
use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
    protected array $guarded = [];
}
```
This will not protect you from mass assignment, but it will allow you to specify which attributes should not be mass assignable. This is useful for protecting sensitive attributes from being mass assigned.
:::

### Trash column
The trash column is a special column that is used to mark an entity as deleted. This is useful for soft deletes, where the entity is not actually deleted from the database, but is marked as deleted. By default, the trash column is called `trashed_at`, but you can override this by defining a `$trashColumn` property in the entity class.

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
    protected string $trashColumn = 'deleted_status';
}
```

This will use the `deleted_status` column instead of the default `trashed_at` column.

## Retrieving Data

After defining an entity, you can retrieve data from the database using the `QueryEngine`'s `for()` method or `fromEntity` function. The `for()` method is a name constructor that allows you to create a new instance of the entity class and retrieve data from the database. The `fromEntity` function is a helper function that allows you to retrieve data from the database by passing the entity class name as a parameter.

In these examples I will use the `for()` method, but you can also use the `fromEntity` . If you want to lean about the [`fromEntity` ](/docs/getting-deeper/helper-functions.md#fromentityentity)function, you can check the [Helper Functions](/docs/getting-deeper/helper-functions.md#fromentityentity) section.

```php showLineNumbers

use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)->get();

foreach ($categories as $category) {
    echo $category->name;
}

```

This will retrieve all the categories from the database and print their names.

### Building the query
The `get()` method fetches all the records from the database. In order to build complex queries, you can chain methods together. For example, you can use the `where()` method to filter the results based on a condition.

```php showLineNumbers
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->whereDate('created_at', '>', '2021-01-01')
  ->orderBy('created_at', 'desc')
  ->limit(30)
  ->get();
```
This will retrieve the categories that were created after January 1st, 2021, order them by the creation date in descending order, and limit the results to 30 records.

:::tip
Since entities rely on the `QueryEngine` to perform database operations, you can use any of the `QueryEngine` methods to build your queries. This includes methods like `where()`, `orderBy()`, `limit()`, and many others. You can also use the `get()` method to retrieve the results.

To learn more about the `QueryEngine` and its methods, you can check the [Query Engine](/docs/pocketORM/query-engine.md) section.
:::

### Note about DataSet
As we have seen in the previous sections, the `get()` method  fetches many records from the database. The fetched records are not just plain PHP arrays, but are actually instances of the `Pocketframe\PocketORM\Essentials\DataSet` class. This allow you to iterate over the records and access their properties using the `->` operator.

```php showLineNumbers

foreach ($categories as $category) {
    echo $category->name;
}
```
This will print the name of each category in the dataset.

### Retrieving a Single Record

In addition to retrieving multiple records, you can also retrieve a single record from the database using defined methods like `first()`, `last()`, or `find()`. These methods return a single instance of the entity class instead of a dataset.

#### Retrieving the first category

```php showLineNumbers
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)->first();

echo $category->name;
```
This will retrieve the first category from the database and print its name.

#### Retrieving the last category
```php showLineNumbers
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)->last();
echo $category->name;
```

This will retrieve the last category from the database and print its name.

#### Retrieving a category by ID
```php showLineNumbers
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)->find(1);
echo $category->name;
```
This will retrieve the category with ID 1 from the database and print its name.

#### Throwing not found exception
If you want to throw an exception when the record is not found, you can use the `findOrFail()` method. This will throw a `Pocketframe\PocketORM\Exceptions\EntityNotFoundException` if the record is not found.

```php showLineNumbers
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)->findOrFail(1);
echo $category->name;
```
This will retrieve the category with ID 1 from the database and print its name. If the category is not found, a `Pocketframe\PocketORM\Exceptions\EntityNotFoundException` will be thrown.


#### Retrieving a single record using a custom query
In addition to the predefined methods, you can also use the `QueryEngine` to build custom queries and retrieve a single record from the database.

```php showLineNumbers
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$category = QueryEngine::for(Category::class)
  ->where('name', 'My Category')
  ->first();
echo $category->name;
```
This will retrieve the category with the name "My Category" from the database and print its name.

:::tip
To learn more about the `QueryEngine` and its methods, you can check the [Query Engine](/docs/pocketORM/query-engine.md) section.
:::

### Deep Fetch
Do you still remember the relationships we defined in the entity class? Great! You can use them to fetch related records from the database. This is called deep fetching. You can use the `include()` method to fetch related records. This solves the N+1 problem, where you have to make multiple queries to fetch related records.

```php showLineNumbers
use App\Entities\Category;
use App\Entities\Post;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

$categories = QueryEngine::for(Category::class)
  ->include('posts', function ($query) {
      $query->where('published', true);
  })
  ->get();

foreach ($categories as $category) {
  echo $category->name;

  foreach ($category->posts as $post) {
      echo $post->title;
  }
}

Output:

/*
Category 1
  Post 1
  Post 2
Category 2
  Post 1
  Post 2
  Post 3
*/
```

This will retrieve all the categories from the database and print their names. For each category, it will also fetch the related posts and print their titles. This is a great way to fetch related records without making multiple queries hence solving the N+1 problem and improving performance.

## Inserting Data

PocketORM provides many ways to insert data into the database and we will cover them in this section. You can use the `save()` method to insert a new record into the database. The `save()` method will automatically determine whether to insert or update the record based on whether the entity has an ID or not.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;

class CategoryController
{

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): Response
  {
    $category = new Category([
      'category_name' => $request->post('category_name'),
      'description'   => $request->post('description'),
    ]);

    $category->save();

    return Response::redirect(route('admin.categories.index'));
  }
}
```
This will create a new category in the database with the name and description provided in the request. The `save()` method will automatically insert the record into the database.

Alternatively, you can also use this where you can just set the attributes and then call the `save()` method to insert the record into the database.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;

class CategoryController
{

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): Response
  {
    $category = new Category();

    $category->category_name = $request->post('category_name');
    $category->description = $request->post('description');

    $category->save();

    return Response::redirect(route('admin.categories.index'));
  }
}
```

Finally, you can also use the `fill()` method to fill the entity with data and then call the `save()` method to insert the record into the database.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;
use App\Entities\Category;

class CategoryController
{
  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): Response
  {
    $category = new Category();

    $category->fill([
      'category_name' => $request->post('category_name'),
      'description'   => $request->post('description'),
    ]);

    $category->save();

    return Response::redirect(route('admin.categories.index'));
  }
}
```
This will also create a new category in the database with the name and description provided in the request. The `fill()` method will fill the entity with the data and then the `save()` method will insert the record into the database.

### Inserting a record using QueryEngine

You can also use the `QueryEngine` to insert a record into the database. This is useful when you want to insert a record into the database without creating an entity instance.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;
use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;

public function store(Request $request): Response
{
  QueryEngine::for(Category::class)
    ->insert([
      'category_name' => $request->post('category_name'),
      'description'   => $request->post('description'),
    ]);

  return Response::redirect(route('admin.categories.index'));
}
```

This will insert a new category into the database with the name and description provided in the request. The `insert()` method will automatically insert the record into the database.


### Inserting Multiple Records
You can also insert multiple records into the database using the `insertBatch()` method. The `insertBatch()` method is a method in QueryEngine which means for this case we are using QueryEngine to insert. This accepts an array of arrays, where each inner array represents a record to be inserted.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;

public function store(Request $request): Response
{
  QueryEngine::for(Category::class)
    ->insertBatch([
      [
        'category_name' => 'Category 1',
        'description'   => 'This is category 1',
      ],
      [
        'category_name' => 'Category 2',
        'description'   => 'This is category 2',
      ],
    ]);

  return Response::redirect(route('admin.categories.index'));
}
```
This will insert two new categories into the database with the names and descriptions provided in the request. The `insertBatch()` method will automatically insert the records into the database.

:::warning
The `insertBatch()` and `insert()` methods does not support [mass assignment](/docs/pocketORM/entity.md#mass-assignment), so you need to specify all the attributes for each record to be inserted. This is different from the `save()` and `fill()` methods, which supports mass assignment by default.

This is because the `insertBatch()` and `insert()` methods are designed to be used with raw data, while the `save()` and `fill()` methods are designed to be used with entity instances.

By using  `insertBatch()` and `insert()`, take precautions to ensure that the data being inserted is valid and sanitized to prevent SQL injection attacks.
:::

## Updating Data

### Updating a record using an Entity

As we mentioned earlier, the `save()` method will automatically determine whether to insert or update the record based on whether the entity has an ID or not. If the entity has an ID, it will update the record in the database. If it does not have an ID, it will insert a new record into the database.

```php showLineNumbers

<?php
namespace App\Http\Controllers\Web;
use App\Entities\Category;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;

class CategoryController
{
  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, int $id): Response
  {
    $category = new Category([
      'id'            => $id,
      'category_name' => $request->post('category_name'),
      'description'   => $request->post('description'),
    ])

    $category->save();

    return Response::redirect(route('admin.categories.index'));
  }
}
```
This will update the category with the ID provided in the request. The `save()` method will automatically update the record in the database.

### Updating a record using QueryEngine

You can also use the `QueryEngine` to update a record in the database. This is useful when you want to update a record in the database without creating an entity instance.

```php showLineNumbers

<?php
namespace App\Http\Controllers\Web;
use App\Entities\Category;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;

class CategoryController
{
  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, int $id): Response
  {
    QueryEngine::for(Category::class)
      ->where('id', $id)
      ->update([
        'category_name' => $request->post('category_name'),
        'description'   => $request->post('description'),
      ]);

    return Response::redirect(route('admin.categories.index'));
  }
}
```
This will update the category with the ID provided in the request. The `update()` method will automatically update the record in the database.

:::warning
The `update()` method does not support [mass assignment](/docs/pocketORM/entity.md#mass-assignment), so you need to specify all the attributes for each record to be updated. This is different from the `save()` and `fill()` methods, which supports mass assignment by default.

This is because the `update()` method is designed to be used with raw data, while the `save()` and `fill()` methods are designed to be used with entity instances.

By using  `update()`, take precautions to ensure that the data being updated is valid and sanitized to prevent SQL injection attacks.
:::


## Deleting Data

### Deleting a record using an Entity

To delete a record from the database, you can use the `delete()` method. The `delete()` method will automatically determine whether to delete the record from the database or not based on whether the entity has an ID or not. If the entity has an ID, it will delete the record from the database. If it does not have an ID, it will not delete anything.

```php showLineNumbers

<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;

class CategoryController
{
  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, int $id): Response
  {
    $category = new Category([
      'id' => $id
    ]);

    $category->delete();

    return Response::redirect(route('admin.categories.index'));
  }
}
```
This will delete the category with the ID provided in the request. The `delete()` method will automatically and permanently delete the record from the database. If you are using the [trashable](/docs/pocketORM/entity.md#trashing-a-record) trait, the record will be trashed instead of permanently deleted.

### Deleting a record using QueryEngine
You can also use the `QueryEngine` to delete a record from the database. This is useful when you want to delete a record from the database without creating an entity instance.

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
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, int $id): Response
  {
    QueryEngine::for(Category::class)
      ->where('id', $id)
      ->delete();

    return Response::redirect(route('admin.categories.index'));
  }
}
```
This will delete the category with the ID provided in the request. The `delete()` method will automatically delete the record from the database. If you are using the [trashable](/docs/pocketORM/entity.md#trashing-a-record) trait, the record will be trashed instead of permanently deleted.

### Deleting multiple records
You can also delete multiple records from the database using the `destroy()` method. The `destroy()` method accepts an array of IDs to be deleted. The `destroy()` method will automatically delete the records from the database.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;
use App\Entities\Category;
use Pocketframe\Http\Response;
use Pocketframe\Http\Request;

class CategoryController
{
  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, $id = null)
  {
      // either an array in POST
      $ids     = $request->post('ids') ?? $id;
      $deleted = Category::destroy($ids);

      return Response::redirect(route('admin.categories.index'));
  }
```

Using the query engine, you can also delete multiple records from the database using the `delete()` method. The `delete()` method accepts an array of IDs to be deleted. The `delete()` method will automatically delete the records from the database.

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
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, $id = null)
  {
      // either an array in POST
      $ids = $request->post('ids') ?? $id;
      QueryEngine::for(Category::class)
        ->whereIn('id', $ids)
        ->delete();

      return Response::redirect(route('admin.categories.index'));
  }
}
```


### Trashing a record

You can also use the `trash()` method to trash a record. The `trash()` method will automatically determine whether to trash the record or not based on whether the entity has an ID or not. If the entity has an ID, it will trash the record. If it does not have an ID, it will not trash anything.

:::tip
As we mentioned earlier, the trash column is a special column that is used to mark an entity as deleted. This is useful for trashing, where the entity is not actually deleted from the database, but is marked as deleted. By default, the trash column is called `trashed_at`, but you can override this by defining a `$trashColumn` property in the entity class.
:::

Before you starting using the `trash()` method, you need to make sure that the entity class uses the [trashable](/docs/pocketORM/entity.md#trashing) trait. This will enable the trashing feature for the entity class.

```php showLineNumbers
<?php

namespace App\Entities;

use Pocketframe\PocketORM\Concerns\TenantAware;
use Pocketframe\PocketORM\Concerns\Trashable;
use Pocketframe\PocketORM\Database\QueryEngine;
use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
  use Trashable;
}
```
This will make your entity class trashable. You can now use the `trash()` method to trash a record. In the database, the record will be marked as deleted by setting the `trashed_at` column to the current date and time.

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
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, int $id): Response
  {
    $category = new Category([
      'id' => $id
    ]);

    $category->trash();

    return Response::redirect(route('admin.categories.index'));
  }
}
```

You can also delete a record using the `QueryEngine`. This is useful when you want to delete a record from the database without creating an entity instance.

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
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, int $id): Response
  {
      $category = QueryEngine::for(Category::class)
        ->find($id);

      $category->trash();

    return Response::redirect(route('admin.categories.index'));
  }
}
```

### Customizing the trash column

You can customize the trash column by defining a `$trashColumn` property in the entity class. This will override the default trash column name. The trash column is used to mark an entity as deleted. This is useful for trashing, where the entity is not actually deleted from the database, but is marked as deleted. Once you define a custom trash column you will need to define the `trashValue` and `restoreValue` properties in the entity class. The `trashValue` property is used to mark an entity as deleted, while the `restoreValue` property is used to mark an entity as restored.

```php showLineNumbers
<?php

namespace App\Entities;

use Pocketframe\PocketORM\Concerns\TenantAware;
use Pocketframe\PocketORM\Concerns\Trashable;
use Pocketframe\PocketORM\Database\QueryEngine;
use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
  use Trashable;

  protected static string $trashColumn = 'delete_status';
  protected static $trashValue         = 'inactive';
  protected static $restoreValue       = 'active';
}
```

:::tip
The `trashValue` and `restoreValue` properties are used to mark an entity as deleted or restored. You can set any values you want for these properties.

For example, you can set the `trashValue` to `1` and the `restoreValue` to `0` if you want to use integer values for the trash column or you can set the `trashValue` to `true` and the `restoreValue` to `false` if you want to use boolean values for the trash column or you can set the `trashValue` to `active` and the `restoreValue` to `inactive` if you want to use string values for the trash column.
:::

### Restoring a record
You can also use the `restore()` method to restore a record. The `restore()` method will automatically determine whether to restore the record or not based on whether the entity has an ID or not. If the entity has an ID, it will restore the record. If it does not have an ID, it will not restore anything.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;
use App\Entities\Category;
use Pocketframe\Http\Response;

class CategoryController
{
  /**
   * Restore the specified resource from storage.
   */
  public function restore(int $id): Response
  {
    $category = new Category([
      'id' => $id
    ]);

    $category->restore();

    return Response::redirect(route('admin.categories.index'));
  }
}
```

:::info
This will also work with the custom trash column, as long as you define the `restoreValue` property in the entity class. The `restoreValue` property is used to mark an entity as restored.
:::

### Entity Scopes

Entity scopes are a way to define common query constraints that can be reused across different queries.  You can define entity scopes in the entity class by defining a method with the `scope` prefix. The method should accept a `QueryEngine` instance and return a modified `QueryEngine` instance.

```php showLineNumbers
<?php

namespace App\Entities;

use Pocketframe\PocketORM\Concerns\Trashable;
use Pocketframe\PocketORM\Database\QueryEngine;
use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{

  public static function scopeActive(QueryEngine $query): QueryEngine
  {
    return $query->where('status', 'active');
  }

}

// Usage

  $categories = QueryEngine::for(Category::class)
        ->scope('active')
        ->get();

```
This will retrieve all the active categories from the database and print their names. You can then use the `scope` method to apply multiple scope to a query.






