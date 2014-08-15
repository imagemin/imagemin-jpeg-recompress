# imagemin-jpeg-recompress 

[![NPM version](https://badge.fury.io/js/imagemin-jpeg-recompress.svg)](http://badge.fury.io/js/imagemin-jpeg-recompress)
[![Build Status](https://travis-ci.org/shinnn/imagemin-jpeg-recompress.svg?branch=master)](https://travis-ci.org/shinnn/imagemin-jpeg-recompress)
[![Dependency Status](https://david-dm.org/shinnn/imagemin-jpeg-recompress.svg)](https://david-dm.org/shinnn/imagemin-jpeg-recompress)
[![devDependency Status](https://david-dm.org/shinnn/imagemin-jpeg-recompress/dev-status.svg)](https://david-dm.org/shinnn/imagemin-jpeg-recompress#info=devDependencies)

[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive#jpeg-recompress) plugin for [imagemin](https://github.com/kevva/imagemin)

*Note that this plugin does [lossy compression](http://wikipedia.org/wiki/Lossy_compression).*

## Example

```javascript
var Imagemin = require('imagemin');
var jpegRecompress = require('imagemin-jpeg-recompress');

var imagemin = new Imagemin()
  .src('original.jpg')
  .dest('optimized.jpg')
  .use(jpegRecompress({loops: 3}));

imagemin.optimize();
```

**original.jpg**: 663,355 bytes

![Original image (from http://commons.wikimedia.org/wiki/File:European_shorthair_procumbent_Quincy.jpg)](https://raw.githubusercontent.com/shinnn/imagemin-jpeg-recompress/master/example/original.jpg)

**optimized.jpg**: 130,338 bytes (80.3% saved)

![Optimized image](https://raw.githubusercontent.com/shinnn/imagemin-jpeg-recompress/master/example/optimized.jpg)

## Installation

[Install with npm](https://www.npmjs.org/doc/cli/npm-install.html). (Make sure you have installed [Node](http://nodejs.org/))

```
npm install --save imagemin-jpeg-recompress
```

## API

```javascript
var jpegRecompress = require('imagemin-jpeg-recompress');
```

### jpegRecompress([*options*])

*options*: `Object`

#### options.strip

Type: `Boolean`  
Default: `true`

> Strip metadata

#### options.accurate

Type: `Boolean`  
Default: `false`

> Favor accuracy over speed

#### options.quality

Type: `String`  
Default: `'medium'`

> Set a quality preset: `'low'`, `'medium'`, `'high'`, `'veryhigh'`

#### options.method

Type: `String`  
Default: `'ssim'`

> Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics) to one of `'mpe'`, `'ssim'`, `'ms-ssim'`, `'smallfry'`

#### options.target

Type: `Number`  
Default: `0.9999`

> Set target quality

#### options.min

Type: `Number`  
Default: `40`

> Minimum JPEG quality

#### options.max

Type: `Number`  
Default: `95`

> Maximum JPEG quality

#### options.loops

Type: `Number`  
Default: `6`

> Set the number of runs to attempt

#### options.defish

Type: `Number`  
Default: `0`

> Set defish strength

#### options.zoom

Type: `Number`  
Default: `1`

> Set defish zoom

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).
