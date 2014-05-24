# imagemin-jpeg-recompress 

[![NPM version](https://badge.fury.io/js/imagemin-jpeg-recompress.svg)](http://badge.fury.io/js/imagemin-jpeg-recompress)
[![Build Status](https://travis-ci.org/shinnn/imagemin-jpeg-recompress.svg?branch=master)](https://travis-ci.org/shinnn/imagemin-jpeg-recompress)
[![Dependency Status](https://david-dm.org/shinnn/imagemin-jpeg-recompress.svg)](https://david-dm.org/shinnn/imagemin-jpeg-recompress)
[![devDependency Status](https://david-dm.org/shinnn/imagemin-jpeg-recompress/dev-status.svg)](https://david-dm.org/shinnn/imagemin-jpeg-recompress#info=devDependencies)

[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive#jpeg-recompress) plugin for [imagemin](https://github.com/kevva/imagemin)

## Installation

Install with [npm](https://www.npmjs.org/). Make sure you have installed [Node](http://nodejs.org/) and libjpeg (or libjpeg-turbo) because this plugin depends on [JPEG Archive](https://github.com/danielgtaylor/jpeg-archive).

Read [the document of JPEG Archive](https://github.com/danielgtaylor/jpeg-archive#dependencies) for more information.

```
npm install --save imagemin-jpeg-recompress
```

## Usage

```javascript
var Imagemin = require('imagemin');
var jpegRecompress = require('imagemin-jpeg-recompress');

var imagemin = new Imagemin()
    .src('foo.jpg')
    .dest('foo-optimized.jpg')
    .use(jpegRecompress({
      quality: 'high',
      progressive: true
    }));

imagemin.optimize();
```

## API

### jpegRecompress([options])

options: `Object`

#### options.progressive

Type: `Boolean`  
Default: `false`

> Set progressive JPEG output

#### options.strip

Type: `Boolean`  
Default: `true`

> Strip metadata

#### options.quality

Type: `String`  
Default: `'medium'`

> Set a quality preset: `'low'`, `'medium'`, `'high'`, `'veryhigh'`

#### options.target

Type: `Number`  
Default: `0.9999`

> Set target [SSIM](http://en.wikipedia.org/wiki/Structural_similarity)

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
