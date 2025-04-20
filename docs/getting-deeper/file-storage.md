---
sidebar_position: 19
---

# File Storage

Pocketframe provides a simple file storage system that allows you to store files in the file system. The file storage system is built on top of the `League\Flysystem`, which means that it stores files in files on the server. This makes it easy to use and requires no additional configuration.

The file storage system is designed to be simple and easy to use. You can store files using the `Storage` class, which provides a simple API for storing and retrieving files.

### Configuration

File system configuration are stored in the `filesystems.php` file in the `config` directory. You can modify the file system configuration by editing the `config/filesystems.php` file.
The file system configuration file contains the following variables:

```php showLineNumbers

<?php

return [
  /**
   * Default Filesystem Disk
   */
  'default' => 'local',

  /**
   *  Filesystem Disks
   *
   * The filesystems are defined as an array of disk configurations.
   * Each disk configuration includes a driver, root directory, and optional URL and visibility settings.
   */
  'disks' => [
    /**
     * Local Storage Disk
     *
     * This disk is used for local file storage.
     */
    'local' => [
      'driver' => 'local',
      'root'   => storage_path('app'),
    ],

    /**
     * Public Storage Link
     *
     * This disk is used to store files that are publicly accessible.
     */
    'public_link' => 'public/store',

    /**
     * Public Storage Disk
     *
     * This disk is used to store files that are publicly accessible.
     *
     */
    'public' => [
      'driver'     => 'local',
      'root'       => storage_path('app/public'),
      'url'        => env('APP_URL') . '/store',
      'visibility' => 'public',
    ],
  ],
];
```

### Usage
You can use the `Storage` class to store files in the file system. The `Storage` class provides a simple API for storing and retrieving files.
You can use the `put` method to store a file in the file system. The `put` method takes the file path and the file contents as arguments. The file path is relative to the root directory of the disk.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$file = Storage::put('path/to/file.txt', 'Hello, world!');
```

### Storing files
You can store files in the file system using the `put` or `store` method.

#### Using the `put` method

The `put` method takes the file path and the file contents as arguments. The file path is relative to the root directory of the disk.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$file = Storage::put('path/to/file.txt', 'Hello, world!');
```

#### Using the `store` method

The `store` method takes the file path and the file contents as arguments. The file path is relative to the root directory of the disk.

```php showLineNumbers

namespace App\Http\Controllers\Web;

use Pocketframe\Http\Response\Response;
use Pocketframe\Http\Request\Request;
use App\Entities\Category;

class CategoryController
{
  public function store(Request $request): Response
  {
    $image_path = $request->file('image')->store('posts', 'public');

    $category = new Category([
      'name' => $request->post('name'),
      'description' => $request->post('description'),
      'image_path' => $image_path
    ]);
    $category->save();

    return Response::redirect('/posts');
  }
}
```

### Local disk

The local disk is used to store files in the local file system. You can use the `put` method to store a file in the local disk. The `put` method takes the file path and the file contents as arguments. The file path is relative to the root directory of the disk.

```php showLineNumbers

use Pocketframe\Storage\Mask\Storage;

$file = Storage::disk('local')->put('path/to/file.txt', 'Hello, world!');
```
You can use the `get` method to retrieve a file from the local disk. The `get` method takes the file path as an argument. The file path is relative to the root directory of the disk.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$file = Storage::disk('local')->get('path/to/file.txt');
```

### Public disk

The public disk is used to store files that are publicly accessible. You can use the `put` method to store a file in the public disk. The `put` method takes the file path and the file contents as arguments. The file path is relative to the root directory of the disk.

```php showLineNumbers

use Pocketframe\Storage\Mask\Storage;

$file = Storage::disk('public')->put('path/to/file.txt', 'Hello, world!');
```

By default, if you want to store files in the public disk, you need to create a symbolic link from the `public/store` directory to the `store/app/public` directory. You can do this by running the following command:

```bash
php pocket store:link
```
This command will create a symbolic link from the `public/store` directory to the `store/app/public` directory. This allows you to access files stored in the public disk using the URL `http://your-app-url/store/path/to/file.txt`.

### Available methods
The `Storage` class provides a number of methods for storing and retrieving files. Here are some of the most commonly used methods:

  **`put($path, $contents)`**:

Store a file in the file system. The `$path` parameter is the path to the file, and the `$contents` parameter is the contents of the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$file = Storage::put('path/to/file.txt', 'Hello, world!');
```


 **`get($path)`**:

Retrieve a file from the file system. The `$path` parameter is the path to the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$file = Storage::get('path/to/file.txt');
```
**`exists($path)`**:

Check if a file exists in the file system. The `$path` parameter is the path to the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$exists = Storage::exists('path/to/file.txt');
```

**`path($path)`**:

Get the full path to a file in the file system. The `$path` parameter is the path to the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$path = Storage::path('path/to/file.txt');
```

**`copy($path, $newPath)`**:

Copy a file in the file system. The `$path` parameter is the path to the file and the `$newPath` parameter is the new path to copy the file to.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$file = Storage::copy('path/to/file.txt', 'path/to/new/file.txt');
```

**`delete($path)`**:

Delete a file from the file system. The `$path` parameter is the path to the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

Storage::delete('path/to/file.txt');
```

**`url($path)`**:

Get the URL to a file in the file system. The `$path` parameter is the path to the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$url = Storage::url('path/to/file.txt');
```

**`disk($disk)`**:

Get a disk instance for the specified disk. The `$disk` parameter is the name of the disk.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$disk = Storage::disk('local');
```

**`switchDisk($disk)`**:

Switch to a different disk. The `$disk` parameter is the name of the disk.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

Storage::switchDisk('local');
```

**`makeDirectory($path)`**:

Create a directory in the file system. The `$path` parameter is the path to the directory.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

Storage::makeDirectory('path/to/directory');
```

**`deleteDirectory($path)`**:

Delete a directory from the file system. The `$path` parameter is the path to the directory.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

Storage::deleteDirectory('path/to/directory');
```

**`listContents($path)`**:

List the contents of a directory in the file system. The `$path` parameter is the path to the directory.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$contents = Storage::listContents('path/to/directory');
```

**`directories($path)`**:

List the directories in a directory in the file system. The `$path` parameter is the path to the directory.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$directories = Storage::directories('path/to/directory');
```

**`files($path)`**:

List the files in a directory in the file system. The `$path` parameter is the path to the directory.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$files = Storage::files('path/to/directory');
```

**`linkPublic($path)`**:

Create a symbolic link to a file in the public disk. The `$path` parameter is the path to the file.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

Storage::linkPublic('path/to/file.txt');
```

### File storage methods

The `Storage` class provides a number of methods for storing and retrieving files. Here are some of the most commonly used methods:

**`getClientOriginalName()`**:

Get the original name of the file. This method is used to get the original name of the file when it was uploaded.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$originalName = $request->file('image')->getClientOriginalName();
```

**`getRealPath()`**:

Get the real path of the file. This method is used to get the real path of the file when it was uploaded.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$realPath = $request->file('image')->getRealPath();
```
**`getClientMimeType()`**:

Get the MIME type of the file. This method is used to get the MIME type of the file when it was uploaded.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$mimeType = $request->file('image')->getClientMimeType();
```

**`getClientOriginalExtension()`**:

Get the original extension of the file. This method is used to get the original extension of the file when it was uploaded.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$extension = $request->file('image')->getClientOriginalExtension();
```

**`getSize()`**:

Get the size of the file. This method is used to get the size of the file when it was uploaded.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$size = $request->file('image')->getSize();
```

**`hashName()`**:

Get the hash name of the file. This method is used to get the hash name of the file when it was uploaded.

```php showLineNumbers
use Pocketframe\Storage\Mask\Storage;

$hashName = $request->file('image')->hashName();
```

### Conclusion

The file storage system in Pocketframe is a simple and easy-to-use system for storing files in the file system. The file storage system is built on top of the `League\Flysystem`, which means that it stores files in files on the server. This makes it easy to use and requires no additional configuration.





