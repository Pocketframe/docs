---
sidebar_position: 15
---


# Pocket View Template Engine

### Introduction
Pocket View uses a simple and powerful template engine that allows you to easily create and render views to your users. It provides a clean and intuitive syntax for creating dynamic views, with features like template inheritance, reusable components, caching, and more. The engine is designed to be easy to use and understand, making it a great choice for building dynamic and interactive web applications. Pocket View has greatly been inspired by Laravel's Blade template engine.

### Basic Syntax
The template engine uses a custom syntax that is easy to read and write. Below are the basic directives and their usage.

| Directive                          | Example                                                                          | Use Case                   |
| ---------------------------------- | -------------------------------------------------------------------------------- | -------------------------- |
| `@layout`                          | `@layout('app')`                                                                 | Specify parent template    |
| `@block`/`@endblock`               | `@block('content')...@endblock`                                                  | Define template sections   |
| `@insert`                          | `@insert('sidebar')`                                                             | Insert block content       |
| `@if`/`elseif`/`@else`/`@endif`    | `@if($condition)...@endif`                                                       | Conditional statements     |
| `@foreach`/`@endforeach`           | `@foreach(...)...@endforeach`                                                    | Loop through items         |
| `@each`/ `@endeach`                | `@each($items, $item, empty)...@endeach`                                         | Loop through items         |
| `@include`                         | `@include('partial')`                                                            | Include partial templates  |
| `@component`                       | `@component('button')`                                                           | Create reusable components |
| `@embed`                           | `@embed('button', ['text' => 'Submit'])`                                         | Embed components           |
| `@csrf`                            | `@csrf`                                                                          | CSRF token field           |
| `@method`                          | `@method('PUT')`                                                                 | HTTP method spoofing       |
| `@error`/`@enderror`               | `@error('field')...@enderror`                                                    | Display validation errors  |
| `@cache`/`@endcache`               | `@cache('key', 60)...@endcache`                                                  | Fragment caching           |
| `{{ }}`/`{{! }}`/`{{js  }}`/`@{ }` | `{{ $var }}` `{{! $html }}` `{{js $name  }}` `@{ json: $user, hydrate: 'User' }` | Escaped/raw output         |

### Template Inheritance
The engine supports template inheritance, which allows you to create a base template that other templates can extend. This makes it easy to create consistent layouts and styles across your application.

### Base Template
The framework provides a base template that you can extend in your views. The base template is located in the `resources/views/layouts` directory.
```html showLineNumbers
<!-- resources/views/layouts/app.view.php -->

 <!DOCTYPE html>
 <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>@insert('title)</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="">
  </head>
  <body>
      <div class="container">
        @insert('content')
      </div>
  </body>
 </html>

  ```

### Child Template (`home.view.php`)

```php showLineNumbers
@layout('layout/app')

@block('title')
    Home Page
@endblock

@block('content')
    <p>This is the home page content.</p>
@endblock
```

### Components
Components allow you to define and reuse blocks of content. You can either create a class based component or an inline component. To create a component, use a pocket command

```bash
php pocket component:create <name>
```

#### Class Based Component

Class based components are components that have both the component class and the component view. To create a class based component, use a pocket command

```bash
php pocket component:create ButtonComponent
```

This will create a new component class and a new component view. The component class will be located in the `app/View/Components` directory and the component view will be located in the `resources/views/components` directory.

:::warning
When creating a component, always follow a name pattern of `ComponentName` which is known as **PascalCase**. If you use a different naming pattern you may get wrong file names.
:::

#### Example of Class Based Component

```php showLineNumbers
<?php

namespace App\View\Components;

class ButtonComponent
{
    public array $props = [];

    public function __construct(array $props = [])
    {
        $this->props = $props;
    }

    /**
     * Returns the view path for this component.
     *
     * @return string
     */
    public function render(): string
    {
        return view('button-component', get_object_vars($this));
    }
}

```

The component class will return the view path for the component view. The `get_object_vars()` function is used to pass the properties of the component to the view. Once properties are added to the component, they will be available to the render method automatically will be passed to the view. However you can still define variables within the render method and merge them with the properties of the component.

#### Example

```php showLineNumbers
<?php

namespace App\View\Components;

class ButtonComponent
{
    public array $props = [];

    public function __construct(array $props = [])
    {
        $this->props = $props;
    }

    /**
     * Returns the view path for this component.
     *
     * @return string
     */
    public function render(): string
    {
      $class = 'btn';
      return view('button-component',array_merge(
            get_object_vars($this),
            [
                'class' => $class
            ]
        ));
    }
}
```

#### Component View example

```html
<button class="<?= $class ?>"><?= $text ?></button>
```

#### Inline Component

Inline components are components that do not have a component class. They are defined directly in the view. To create an inline component, use a pocket command

```bash
pocket component:create Alert --inline
```

This will create a new component view. The view will be stored in `resources/views/components` directory.
Pocket View provide you with a syntax `<x-... >` which is more like XML. For example the above component can be written as:

```html showLineNumbers
<button class="bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors duration-200 inline-flex items-center p-2">
  <?= $slot ?>
</button>
```

```html
<x-button text="Submit" />
```


:::tip
When you create a component and you want to pass data to it, always add slots by using `<?= $slot ?>`. If you use `{{ $slot }}` you will get an error or the component will fail to render.
:::

#### Example

```php showLineNumbers
// resources/views/components/alert.inline.view.php

<div class="alert alert-{{ $type }}">
    <?= $message ?>
</div>
```

#### Usage

```php showLineNumbers
<div>
    <x-alert type="success" message="This is a success message" />
    <x-alert type="danger" message="This is a danger message" />
</div>
```

```php showLineNumbers
@component('button')
  <button class="<?= $class ?>"><?= $text ?></button>
@endcomponent

@component('alert')
  <div class="alert alert-<?= $type ?>">
    <?= $message ?>
  </div>
@endcomponent
```

#### Using a Component

```php showLineNumbers
@layout('layouts/app')

@block('content')
    <div>
        @embed('button', ['text' => 'Submit'])
        @embed('button', ['text' => 'Cancel'])

        @embed('alert', [
            'type' => 'success',
            'message' => 'Operation completed successfully!'
        ])
    </div>
@endblock
```

#### Partials

Partials are reusable pieces of code that can be included in other views. To create a partial, use a pocket command.

```bash
php pocket partial:create <name>
```

This will create a new partial view. The view will be stored in `resources/views/partials` directory.

#### Example

```html showLineNumbers
// resources/views/partials/header.view.php

<header>
  <h1><?= $title ?></h1>
</header>
```

#### Usage

```php showLineNumbers
@layout('layouts/app')

@block('content')
  @include('partials/header', ['title' => 'Home'])
@endblock
```

### Control Structures
The template engine supports common control structures like if, foreach, and each.

#### If Statement

```php showLineNumbers
@if ($condition)
  <p>Condition is true</p>
@elseif ($condition2)
  <p>Condition 2 is true</p>
@else
  <p>Condition is false</p>
@endif
```

#### Foreach Loop

```php showLineNumbers
@foreach ($items as $item)
  <p><?= $item ?></p>
@endforeach
```

#### Each Loop

:::tip
You can also use the `@each` directive to iterate over an array of items.
:::

Each loop is a version of foreach loop that is used to iterate over an array of items. It is similar to foreach loop but it is used when you want to display a message automatically when no record is found in the database.

```php showLineNumbers
@each($items, item, empty)
  <p><?= $item ?></p>
@endeach
```

#### Example

```php showLineNumbers
@each($users, user, No users found)
  <p><?= $user['name'] ?></p>
@endeach
```


#### The `$loop` variable

The `$loop` variable is available inside the loop and provides information about the current iteration.

#### Example

```php showLineNumbers
@foreach ($items as $item)
  <p><?= $loop->iteration ?></p>
@endforeach
```

#### The `$loop` variable properties

| Property    | Description                                    |
| ----------- | ---------------------------------------------- |
| `iteration` | The current iteration number                   |
| `first`     | Whether the current iteration is the first one |
| `last`      | Whether the current iteration is the last one  |
| `index`     | The current iteration index                    |
| `count`     | The total number of iterations                 |
|             |

### Rendering and displaying data
You can render and display data in your views by using the following syntax:
```php
return Response::view('welcome', ['name' => 'Pocketframe']);
```
```php
<p>{{ $name }}</p>
```
The `{{  }}` syntax is used to display data in your views. These are called echo statements which automatically escape the data by using PHP's built-in `htmlspecialchars` function to prevent XSS attacks.

### Displaying unescaped data
If you want to display unescaped data in your views, you can use the following syntax:
```php
<p>{{! $name }}</p>
```

:::warning
You should use this syntax with caution as it can lead to security vulnerabilities if not used properly.
:::

### Javascript escaping
You can escape javascript code in your views by using the following syntax:

```html showLineNumbers
<script>
  const name = {{js $name }};
</script>
```

### Caching
Caching allows you to store rendered template fragments for improved performance.

#### Cache a Block

```php showLineNumbers
@cache('user_list', 60)
  <ul>
    @foreach($users as $user)
      <li><?= $user['name'] ?></li>
    @endforeach
  </ul>
@endcache
```

### Error Handling
Display validation errors for form fields.

#### Error Block

```php showLineNumbers
@error('field')
  <p><?= $message ?></p>
@enderror
```

### Debugging
Enable debugging to display debug information in development environments.

#### Debug Block

```php showLineNumbers
@debug
  <p><?= $message ?></p>
@enddebug
```

#### Dump

You can dump data in your views by using the following syntax:

```php
@dd($data)
```

### Lazy Loading
Lazy load content to improve page performance.

#### Lazy Load Content

```php
@lazy('/path/to/content')
```

### CSRF Protection
Generate a CSRF token for forms.

```html showLineNumbers
<form method="POST">
    @csrf
    <button type="submit">Submit</button>
</form>
```

### JavaScript Hydration
Hydrate JavaScript with data from the server.

#### Hydration Example

```html showLineNumbers
<script>
   @{ json: $user, hydrate: 'User' }
</script>
```

### Comments
Add comments to your templates that will not be rendered in the output.

#### Template Comments

```php
{#  #}
```

### Method spoofing
You can spoof HTTP methods in forms by using the following syntax:

```php showLineNumbers
// method spoofing

@method('DELETE')
```


### Custom PHP Code
Execute custom PHP code within templates.

```php
@php
    $timestamp = time();
@endphp

<p>Current timestamp: {{ $timestamp }}</p>
```

### Advanced Features

#### Dynamic Components

Dynamically include components based on a variable.

```php showLineNumbers

@embed($componentName, $componentData)
```
