# imagemin-jpeg-recompress [![Build Status](http://img.shields.io/travis/imagemin/imagemin-jpeg-recompress.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-jpeg-recompress) [![Build status](https://ci.appveyor.com/api/projects/status/gl9i2tudi4oggk0v)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-jpeg-recompress)

> jpeg-recompress imagemin plugin


## Install

```bash
$ npm install --save imagemin-jpeg-recompress
```


## Usage

```js
var Imagemin = require('imagemin');
var jpegRecompress = require('imagemin-jpeg-recompress');

var imagemin = new Imagemin()
  .src('foo.jpg')
  .dest('foo-optimized.jpg')
  .use(jpegRecompress({ loops: 3 }));

imagemin.optimize();
```


## Options

### strip

Type: `Boolean`  
Default: `true`

Strip metadata.

### accurate

Type: `Boolean`  
Default: `false`

Favor accuracy over speed.

### quality

Type: `String`  
Default: `medium`

Set a quality preset. Available presets: `low`, `medium`, `high` and `veryhigh`.

### method

Type: `String`  
Default: `ssim`

Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics). 
Available methods: `mpe`, `ssim`, `ms-ssim` and `smallfry`.

### target

Type: `Number`  
Default: `0.9999`

Set target quality.

### min

Type: `Number`  
Default: `40`

Minimum JPEG quality.

### max

Type: `Number`  
Default: `95`

Maximum JPEG quality.

### loops

Type: `Number`  
Default: `6`

Set the number of attempts.

### defish

Type: `Number`  
Default: `0`

Set defish strength.

### zoom

Type: `Number`  
Default: `1`

Set defish zoom.


## License

MIT © [imagemin](https://github.com/imagemin)
