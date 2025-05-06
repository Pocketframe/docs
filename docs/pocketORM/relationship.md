---
sidebar_position: 27
---

# Relationships

## Introduction
Relationships are a way to define the relationship between entities. They are defined in the entity class using the `$relationship` property. The `$relationship` property is an array of relationships. The creates relationships to your database tables. You can define a:
 - [one-to-one](/docs/pocketORM/relationship.md#one-to-one)
 - one-to-many
 - many-to-one
 - many-to-many

Basic relationships are defined using the `Entity::HAS_ONE`, `Entity::HAS_MULTIPLE`, `Entity::OWNED_BY`, and `Entity::BELONGS_TO` constants.

### Syntax

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;

class Category extends Entity
{
   protected array $relationship = [
      /**
      * One-to-One
      * In the array we have: parent entity, related entity, foreign key
      */
      'profile' => [Entity::HAS_ONE, Profile::class, 'user_id'],
      /**
      * One-to-Many
      * In the array we have: parent entity, related entity, foreign key
      */
      'posts'   => [Entity::HAS_MULTIPLE, Post::class, 'post_id'],
      /**
       *  Many-to-One (Belongs to)
       * In the array we have: parent entity, related entity, foreign key
       */
      'role'    => [Entity::OWNED_BY, Role::class, 'role_id'],
      /**
       * Bridge table
       * In the array we have: parent entity, related entity, bridge table, foreign key, related foreign key
       */
      'groups'  => [Entity::BRIDGE, Group::class, 'user_groups', 'user_id', 'group_id']
    ];
}
```
## Defining Relationships
Relationships are defined in the entity class using the `$relationship` property. The `$relationship` property is an array of relationships. This creates relationships to your database tables.

### One-to-One/ Entity::HAS_ONE
One-to-one relationships are defined using the `Entity::HAS_ONE` constant. The first item is the relationship type, the second item is the related entity, and the third item is the foreign key.

```php showLineNumbers
<?php
namespace App\Entities;

use Pocketframe\PocketORM\Entity\Entity;
use App\Entities\User;

class Staff extends Entity
{
  protected array $relationship = [
    'user' => [Entity::HAS_ONE, User::class, 'user_id'],
  ]
}
```
The first item in the array is the relationship type, the second item is the related entity, and the third item is the foreign key. The foreign key is the column in the parent entity that references the related entity. The related entity is the entity that is related to the parent entity.

You can access the related entity by:
```php showLineNumbers
<?php
namespace App\Controllers\Web;

use App\Entities\Staff;

$staff = QueryEngine::find(Staff::class)
  ->include('user')
  ->first();

// Access the related entity
$user = $staff->user;
```

### One-to-Many/ Entity::HAS_MULTIPLE
One-to-many relationships are defined using the `Entity::HAS_MULTIPLE` constant. The first item is the relationship type, the second item is the related entity, and the third item is the foreign key.
```php showLineNumbers
<?php
namespace App\Entities;
use Pocketframe\PocketORM\Entity\Entity;
use App\Entities\Post;

class Category extends Entity
{
  protected array $relationship = [
    'posts' => [Entity::HAS_MULTIPLE, Post::class, 'post_id'],
  ];
}
```




