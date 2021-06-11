# imagemin-jpeg-recompress

> jpeg-recompress imagemin plugin

## Install

```
$ npm install --save imagemin-jpeg-recompress
```

## Usage

```js
const imagemin = require('imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

(async () => {
	await imagemin(['images/*.jpg'], {
		destination: 'build/images',
		plugins: [
			imageminJpegRecompress()
		]
	});

	console.log('Images optimized');
})();
```

## API

### imageminJpegRecompress(options?)(buffer)

#### options

##### accurate

Type: `boolean`\
Default: `false`

Favor accuracy over speed.

##### quality

Type: `string`\
Default: `medium`

Set a quality preset. Available presets: `low`, `medium`, `high` and `veryhigh`.

##### method

Type: `string`\
Default: `ssim`

Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics). Available methods: `mpe`, `ssim`, `ms-ssim` and `smallfry`.

##### target

Type: `number`\
Default: `0.9999`

Set target quality.

##### min

Type: `number`\
Default: `40`

Minimum JPEG quality.

##### max

Type: `number`\
Default: `95`

Maximum JPEG quality.

##### loops

Type: `number`\
Default: `6`

Set the number of attempts.

##### defish

Type: `number`\
Default: `0`

Set defish strength.

##### progressive

Type: `boolean`\
Default: `true`

Enable progressive encoding.

##### subsample

Type: `string`\
Default: `default`

Set subsampling method. Available values: `default`, `disable`.

##### strip

Type: `boolean`\
Default: `true`

Strips metadata, such as EXIF data.

#### buffer

Type: `buffer`

Buffer to optimize.
