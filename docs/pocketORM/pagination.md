---
sidebar_position: 26
---

# Pagination

## Introduction
Pagination is a technique for dividing a document into discrete pages, known as "pages". The pages may be accessed sequentially or randomly. The purpose of pagination is to break up the content of a document into smaller, more manageable chunks, making it easier for users to navigate and find the information they are looking for.

Pocketframe comes with a built-in pagination system that allows you to paginate the results of a query. By default, Pocketframe uses [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) and [TailwindCSS](https://tailwindcss.com/docs/installation/using-vite) for pagination.

## Configuration
Pocketframe comes with a built-in pagination system that allows you to paginate the results of a query. By default, Pocketframe uses [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) and [TailwindCSS](https://tailwindcss.com/docs/installation/using-vite) for pagination. All configuration for pagination is done in the `config/pagination.php` file.

### Configuration Options
Then in you .env file, you can set the following variables:
```env showLineNumbers
PAGINATION_FRAMEWORK=tailwind

PAGINATION_ACTIVE_BG=blue-600
PAGINATION_ACTIVE_TEXT=white
PAGINATION_INACTIVE_BG=gray-100
PAGINATION_INACTIVE_TEXT=gray-700
PAGINATION_HOVER_BG=blue-500
PAGINATION_INFO_TEXT=blue-600
```

## Usage

Pocketframe provides two types of pagination which are `Paginator` and `CursorPaginator`. The `Paginator` is used to paginate the results of a query by using the `limit` and `offset` parameters. The `CursorPaginator` is used to paginate the results of a query by using the `cursor` parameter.

### Paginator
The `Paginator` is used to paginate the results of a query by using the `limit` and `offset` parameters. The `Paginator` class is located in the `Pocketframe\PocketORM\Pagination\Paginator` namespace. To use the paginator, you need to call the `paginate()` method on the query engine. By default, paginate is set to 15 records per page. You can change the number of records per page by passing the number of records as the parameter to the `paginate()` method.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

class CategoryController
{
  /**
   *  Display a listing of the resource.
   *
   * @return Response
  */
  public function index(): Response
  {
    $categories = QueryEngine::for(Category::class)
      ->paginate(10);

    return Response::view('admin.categories.index', [
      'categories' => $categories
      ]);
  }
}
```
This will return a paginated response with 10 records per page. You can access the pagination links by using the `@paginate` directive or `<x-paginate :dataset="$categories" />` in your view. The `@paginate` directive takes the dataset as the first parameter and the second parameter as the mode. This only applies if you are using cursor pagination.

```html showLineNumbers
 <div>
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-3">#</th>
          <th class="p-3">Category</th>
          <th class="p-3">Description</th>
        </tr>
      </thead>
      <tbody>
        @foreach($categories as $category)
        <tr class="border-t">
          <td class="p-3">{{ $loop->iteration }}</td>
          <td class="p-3">
              {{ $category->category_name }}
          </td>
          <td class="p-3">
            {{ $category->description }}
          </td>
        </tr>
        @endforeach
      </tbody>
    </table>

    <!-- Pagination -->
    <x-paginate :dataset="$categories" />
  </div>
```
or you can use the `@paginate` directive in your pocket view file.

```html showLineNumbers
 <div>
    <table>
      <!-- ... -->
    </table>

    <!-- Pagination -->
    @paginate($categories)
  </div>
```

:::danger
If you are using `cursor pagination`, you must pass the second parameter as `cursor`. If you are using the `paginate` there is no need to pass the second parameter.
:::

### Cursor Paginator
The `CursorPaginator` is used to paginate the results of a query by using the `cursor` parameter. The `CursorPaginator` class is located in the `Pocketframe\PocketORM\Pagination\CursorPaginator` namespace. To use the paginator, you need to call the `cursorPaginate()` method on the query engine. By default, cursor pagination is set to 15 records per page. You can change the number of records per page by passing the number of records as the parameter to the `cursorPaginate()` method.

```php showLineNumbers
<?php
namespace App\Http\Controllers\Web;

use App\Entities\Category;
use Pocketframe\PocketORM\QueryEngine\QueryEngine;

class CategoryController
{
  /**
   *  Display a listing of the resource.
   *
   * @return Response
  */
  public function index(): Response
  {
    $categories = QueryEngine::for(Category::class)
      ->cursorPaginate();

    return Response::view('admin.categories.index', [
      'categories' => $categories
    ]);
  }
}
```

This will return a paginated response with 15 records per page. You can access the pagination links by using the `@paginate` directive or `<x-paginate :dataset="$categories" :mode="cursor" />` in your view. The `@paginate` directive or `<x-paginate :dataset="$categories" :mode="cursor" />` takes the dataset as the first parameter and the second parameter as the mode. This only applies if you are using cursor pagination.

```html showLineNumbers
 <div>
    <table>
      <!-- ... -->
    </table>

    <!-- Pagination -->
     <x-paginate :dataset="$categories" mode="cursor" />
     <!-- or -->
    @paginate($categories, 'cursor')
  </div>
```
## Available Methods

### Paginator Methods

The `Paginator` has the following methods:

| Method | Description |
| --- | --- |
| `detectBaseUrl()` | Detects the base URL for the pagination links based on the current request URI. |
| `data()` | Returns the paginated data as an array. If the data is already an array, it is returned as is. Otherwise, it is converted to an array. |
| `currentPage()` | Returns the current page number. |
| `lastPage()` | Returns the last page number. |
| `total()` | Returns the total number of items. |
| `perPage()` | Returns the number of items per page. |
| `pages()` | Returns the pages as an array. |
| `getIterator()` | Returns the iterator. |
| `processStyles()` | Processes the styles for the active framework. |
| `renderPages()` | Renders the pagination links for the active framework. |
| `renderFrameworkSpecificPages()` | Renders the pagination links for the active framework. |
| `renderTailwindPagination()` | Renders the pagination links for the Tailwind CSS framework.|
| `renderBootstrapPagination()` | Renders the pagination links for the Bootstrap framework.|
| `renderPreviousLink()` | Renders the previous link for the active framework. |
| `renderNextLink()` | Renders the next link for the active framework. |
| `renderPageLinks()` | Renders the page links for the active framework. |
| `buildPageLink()` | Builds the page link for the active framework.|
| `buildLink()` | Builds the link for the active framework.|
| `getInfoText()` | Gets the info text for the active framework.|
| `getAjaxScript()` | Gets the ajax script for the active framework.|

### Cursor Paginator Methods

The `CursorPaginator` has the following methods:

| Method | Description |
| --- | --- |
| `detectBaseUrl()` | Detects the base URL for the pagination links based on the current request URI. |
| `data()` | Returns the current page data. |
| `nextCursor()` | Returns the cursor for the next page. |
| `previousCursor()` | RReturns the cursor for the previous page.|
| `hasNext()`| Returns true if there is a next page, false otherwise.|
| `hasPrevious()`| Returns true if there is a previous page, false otherwise.|
| `perPage()`| Returns the number of items per page.|
| `getIterator()`| Returns an iterator for the current page data.|
| `renderCursor()`| Renders the full Prev/Next + info for the pagination.|
| `buildFrameworkControls()`| Builds the Prev/Next controls for a given framework.|
| `buildLink()`| Builds a single Prev/Next link (or disabled span) for a given cursor.|
| `getAjaxScript()` | Returns the Ajax script.|

With the `Paginator` and `CursorPaginator` classes, you can easily paginate your data and display it in your views. You can also customize the pagination links and styles to match your application's design and branding from the .env file.
