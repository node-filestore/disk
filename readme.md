# FileStore - Disk

Store and retreive files to disk.

## Installation

```sh
npm install --save @filestore/disk
```

## Usage

```js
const Disk = require('@filestore/disk')
const fs = require('fs')

const filestore = new S3({ path: 'uploads' })
const file = fs.createReadStream('my-file.txt')

filestore.put('my-file.txt', file).then(() => {
  // "my-file.txt" is now copied to the S3 directory "uploads"
})
```

## API

The API is meant to be interchangeable with any other `@filestore/...` module.

### `new Disk(options)`

+ `options.path` - Path to the directory to store files in
+ `options.prefix` - Prefix that will be prepended to each filename (e.g. `"disk-"`)

Instantiates a new Disk FileStore class.

### `.put(id: string, data: Input[, options: object]) => Promise<void>`

Save a file to disk.

`data` can be a `ReadableStream`, `Buffer`, `string`, `Iterable<Buffer|string>` or `Promise`.

### `.get(id: string) => ReadableStream`

Fetch a file from disk.

### `.has(id: string) => Promise<boolean>`

Check if a file exists on disk.
