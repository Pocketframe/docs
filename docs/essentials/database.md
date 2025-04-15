---
sidebar_position: 11
---

# Database

### Introduction

Pocketframe provides a convenient `DB` class for database interactions. With it, you can easily perform common queries, joins, pagination, and transactions—all while leveraging a familiar, chainable API. This guide walks you through configuring the database connection and using the various methods available.


### Configuration

You can configure the database by adding the following to the `.env` file.

```php showLineNumbers
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

After configuring the database, you can use the `DB` class to interact with the database.

```php showLineNumbers
use Pocketframe\Database\DB;

$posts = DB::table('posts')->get();

/*
Output:
  [
    [
      'id' => 1,
      'title' => 'Post 1',
      'body' => 'Body 1',
    ],
    [
      'id' => 2,
      'title' => 'Post 2',
      'body' => 'Body 2',
    ],
  ]
*/
```

**Available Methods:**

  - **table(string $table)**

    Sets the table name for the query. You can pass the table name to the method.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')
    ```
    **Parameters:**
    - `$table`: The name of the table to query.

  - **select(array $columns)**

    Specifies which columns to select from the table. You can pass an array of columns to select from the table.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->select(['id', 'name', 'email'])

    /*
    Output:
      [
        [
          'id' => 1,
          'name' => 'John Doe',
          'email' => 'john@example.com',
        ],
        [
          'id' => 2,
          'name' => 'Jane Doe',
          'email' => 'jane@example.com',
        ],
      ]
    */
    ```
    **Parameters:**
    - `$columns`: An array of columns to select from the table.

  - **where(string $column, string $operator, mixed $value)**

    Adds a WHERE clause to filter results.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->where('age', '>', 18)
    ```
    **Parameters:**
    - `$column`: The column to filter by.
    - `$operator`: The operator to use in the filter.
    - `$value`: The value to filter by.

  - **orWhere(string $column, string $operator, string $value)**

    Adds an OR WHERE clause to filter results.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->where('age', '>', 18)->orWhere('role', '=', 'admin')
    ```
    **Parameters:**
    - `$column`: The column to filter by.
    - `$operator`: The operator to use in the filter.
    - `$value`: The value to filter by.

  - **andWhere(string $column, string $operator, string $value)**

    Adds an AND WHERE clause to filter results.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->where('age', '>', 18)->andWhere('active', '=', 1)
    ```
    **Parameters:**
    - `$column`: The column to filter by.
    - `$operator`: The operator to use in the filter.
    - `$value`: The value to filter by.

  - **whereNull(string $column)**

    Adds a WHERE IS NULL clause.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->whereNull('deleted_at')
    ```
    **Parameters:**
    - `$column`: The column to filter by.

  - **whereNotNull(string $column)**

    Adds a WHERE IS NOT NULL clause.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->whereNotNull('email')
    ```
    **Parameters:**
    - `$column`: The column to filter by.

  - **andWhereNull(string $column)**

    Adds an AND WHERE IS NULL clause.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->where('active', '=', 1)->andWhereNull('deleted_at')
    ```
    **Parameters:**
    - `$column`: The column to filter by.

  - **orIsNull(string $column)**

    Adds an OR WHERE IS NULL clause.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->where('active', '=', 1)->orIsNull('deleted_at')
    ```
    **Parameters:**
    - `$column`: The column to filter by.

  - **orderByDesc(string $column)**

    Orders results by a column in descending order.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->orderByDesc('created_at')
    ```
    **Parameters:**
    - `$column`: The column to order by.

  - **orderByAsc(string $column)**

    Orders results by a column in ascending order.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->orderByAsc('name')
    ```
    **Parameters:**
    - `$column`: The column to order by.

  - **orWhereNotNull(string $column)**

    Adds an OR WHERE IS NOT NULL clause.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->where('active', '=', 1)->orWhereNotNull('email')
    ```
    **Parameters:**
    - `$column`: The column to filter by.

  - **join(string $table, string $firstColumn, string $operator, string $secondColumn, string $type = 'INNER')**

    Adds a JOIN clause to the query.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->join('posts', 'users.id', '=', 'posts.user_id')

    /*
    Output:
      [
        [
          'id' => 1,
          'name' => 'John Doe',
          'email' => 'john@example.com',
          'posts' => [
            [
              'id' => 1,
              'title' => 'Post 1',
              'body' => 'Body 1',
            ],
            [
              'id' => 2,
              'title' => 'Post 2',
              'body' => 'Body 2',
            ],
          ],
        ],
      ]
    */
    ```
    **Parameters:**
    - `$table`: The table to join.
    - `$firstColumn`: The first column to join on.
    - `$operator`: The operator to use in the join.
    - `$secondColumn`: The second column to join on.
    - `$type`: The type of join to use.

  - **limit(int $limit)**

    Limits the number of results returned.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->limit(10)
    ```
    **Parameters:**
    - `$limit`: The number of results to return.

  - **offset(int $offset)**

    Sets the offset for the results.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->offset(10)
    ```
    **Parameters:**
    - `$offset`: The offset to set for the results.
  - **get()**

    Executes the query and returns all results.
    ```php
    DB::table('users')->get()
    ```

  - **first()**

    Gets the first result from the query.
    ```php
    DB::table('users')->first()
    ```

  - **count()**

    Counts the number of results.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->count()
    ```

  - **paginate(int $perPage = 15)**

    Paginates the results.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::table('users')->paginate(20)
    ```
    **Parameters:**
    - `$perPage`: The number of results to return per page.

  - **insert(string $table, array $columns)**

    Inserts a new record.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::insert('users',
    [
      'name' => 'John',
      'email' => 'john@example.com'
    ]);
    ```
    **Parameters:**
    - `$table`: The table to insert the record into.
    - `$columns`: An array of columns to insert into the table.

  - **update(string $table, array $sets, array $condition)**

    Updates existing records.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::update('users',
    [
      'name' => 'John',
      'email' => 'johndoe@example.com'
    ],
    [
      'id' => 1
    ]);
    ```
    **Parameters:**
    - `$table`: The table to update the record in.
    - `$sets`: An array of columns to update.
    - `$condition`: An array of conditions to update the record.

  - **delete(string $table, array $condition)**

    Soft deletes records (sets deleted_at).
    ```php
    DB::delete('users', ['id' => 1])
    ```
    **Parameters:**
    - `$table`: The table to delete the record from.
    - `$condition`: An array of conditions to delete the record.

  - **forceDelete(string $table, array $condition)**

    Permanently deletes records.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::forceDelete('users', ['id' => 1])
    ```
    **Parameters:**
    - `$table`: The table to delete the record from.
    - `$condition`: An array of conditions to delete the record.

  - **transaction(callable $callback)**

    Executes queries within a transaction.
    ```php showLineNumbers
    use Pocketframe\Database\DB;

    DB::transaction(function() use($request) {
      // Insert a post
      $post = DB::insert('posts', [
        'user_id' => 1,
        'title' => $request->post('title'),
        'body' => $request->post('body'),
      ]);

      // Insert a comment
      DB::insert('comments', [
        'post_id' => $post->id,
        'body' => $request->post('body'),
      ]);
    })
    ```
    **Parameters:**
    - `$callback`: A callback function to execute the queries.
