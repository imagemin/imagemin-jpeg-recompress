# imagemin-jpeg-recompress [![Build Status](https://travis-ci.org/imagemin/imagemin-jpeg-recompress.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-jpeg-recompress) [![Build status](https://ci.appveyor.com/api/projects/status/gl9i2tudi4oggk0v?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-jpeg-recompress)

> jpeg-recompress imagemin plugin


## Install

```
$ npm install --save imagemin-jpeg-recompress
```


## Usage

```js
var Imagemin = require('imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

new Imagemin()
	.src('images/*.jpg')
	.dest('build/images')
	.use(imageminJpegRecompress({loops: 3}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('default', function () {
	return gulp.src('images/*.jpg')
		.pipe(imageminJpegRecompress({loops: 3})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminJpegRecompress(options)

#### options.accurate

Type: `boolean`  
Default: `false`

Favor accuracy over speed.

#### options.quality

Type: `string`  
Default: `medium`

Set a quality preset. Available presets: `low`, `medium`, `high` and `veryhigh`.

#### options.method

Type: `string`  
Default: `ssim`

Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics). Available methods: `mpe`, `ssim`, `ms-ssim` and `smallfry`.

#### options.target

Type: `number`  
Default: `0.9999`

Set target quality.

#### options.min

Type: `number`  
Default: `40`

Minimum JPEG quality.

#### options.max

Type: `number`  
Default: `95`

Maximum JPEG quality.

#### options.loops

Type: `number`  
Default: `6`

Set the number of attempts.

#### options.defish

Type: `number`  
Default: `0`

Set defish strength.

#### options.progressive

Type: `boolean`  
Default: `true`

Enable progressive encoding.

#### options.subsample

Type: `string`  
Default: `default`

Set subsampling method. Available values: `default`, `disable`.


## License

MIT © [imagemin](https://github.com/imagemin)
