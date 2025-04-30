---
sidebar_position: 22
---
# Introduction to PocketORM

PocketORM is a lightweight and powerful Object-Relational Mapping (ORM) library designed for Pocketframe to simplify database interactions in PHP applications. It provides an intuitive API for managing database entities, relationships, transactions and queries, enabling developers to focus on application logic rather than low-level database operations.

With PocketORM, you can define entities, map them to database tables, and perform CRUD operations effortlessly. It also supports advanced features like relationships, schema scripts for create database tables, data planting, trashing, transform records into datasets, serialization and blueprints to populate your database with fake data for testing purposes. This guide will help you get started with PocketORM.

### Key Features

#### 1. [Entity Management](/docs/pocketORM/entity.md)
Define and manage [entities](/docs/pocketORM/entity.md) that represent database tables. PocketORM provides tools to map PHP classes to database [tables](/docs/pocketORM/schemascript.md) seamlessly. This helps in maintaining a clean separation between your application logic and database structure.

#### 2. [Entity Mapper](/docs/pocketORM/entity-mapper.md)
The [entity mapper](/docs/pocketORM/entity-mapper.md) allows you to manage persistence of data objects to the database. It provides methods for saving, updating, and deleting entities.

#### 3. [Query Engine](/docs/pocketORM/query-engine.md)
A robust [query engine](/docs/pocketORM/query-engine.md) allows you to build and execute complex database queries programmatically. You can use the [query engine](/docs/pocketORM/query-engine.md) to construct SQL queries using a fluent interface, making it easy to work with different database systems.

#### 4. [Dataset Handling](/docs/pocketORM/dataset.md)
PocketORM supports the concept of datasets, which represent collections of data objects. It provides methods for working with datasets, including `toArray()`, `all()`, `first()`, and `last()`, `map()`, `filter()` and `pluck()` which allow you to manipulate and transform data easily.

#### 5. [Relationships](/docs/pocketORM/relationship.md)
Define and manage [relationships](/docs/pocketORM/relationship.md) between entities, such as:
- `hasOne`: One-to-one relationships.
- `hasMultiple`: One-to-many relationships.
- `ownedBy`: Inverse of `hasOne` and `hasMultiple`.
- `bridge`: Many-to-many relationships.


#### 6. [Schema Scripts](/docs/pocketORM/schemascript.md)
Generate and manage [schema scripts](/docs/pocketORM/schemascript.md) for creating and modifying database tables. This feature allows you to define your database structure programmatically, making it easier to maintain and version control your database schema. PocketORM provides a simple and intuitive way to define your database schema, making it easy to manage your database structure.

#### 7. [Blueprints](/docs/pocketORM/blueprint.md)
[Blueprints](/docs/pocketORM/blueprint.md) allows to create fake data for your entities. This is useful for testing and development purposes, as it allows you to quickly generate realistic data without having to manually enter it.

#### 8. [Data Planter](/docs/pocketORM/dataplanter.md)
The [data planter](/docs/pocketORM/dataplanter.md) feature allows you to populate your database with sample data. This is particularly useful for testing and development purposes, as it enables you to quickly set up a database with realistic data without having to manually enter it. Data planters can work hand in hand with blueprints to generate fake data for your entities.

#### 9. Transaction
The data safe feature allows to define transactional operations for your entities. This means that you can perform multiple database operations as a single unit of work, ensuring that either all operations succeed or none do. This is particularly useful for maintaining data integrity and consistency in your application.

```php showLineNumbers
<?php
use Pocketframe\PocketORM\QueryEngine\QueryEngine;
use App\Entities\Category;
use App\Entities\Post;

  DataSafe::guard(function () use ($request) {
    $category = new Category([
      'category_name' => $request->post('category_name'),
      'slug'          => StringUtils::slugify($request->post('category_name')),
      'status'        => $request->post('status'),
      'description'   => $request->post('description'),
    ]);

    $category->save();

    $category->tags()->attach($request->post('tags'));
  });
```


#### 10. Table Utilities
PocketORM provides several utilities for working with tables, including:
- [`table-builder`](/docs/pocketORM/schemascript.md): Programmatically build and modify tables.
- [`table-script`](/docs/pocketORM/schemascript.md): Generate scripts for table creation or modification.
- [`deepfetch`](/docs/pocketORM/entity.md): Fetch deeply nested relationships.
- [`trashable`](/docs/pocketORM/entity.md): Enable soft deletes for tables.

### Conclusion
PocketORM is a powerful and flexible ORM library that simplifies database interactions in PHP applications. With its intuitive API, advanced features, and support for various database systems, PocketORM makes it easy to manage your application's data layer. Whether you're building a small application or a large-scale system, PocketORM provides the tools you need to work with your database efficiently.

