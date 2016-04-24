'use strict';

var path = require('path');
var bufferEqual = require('buffer-equal');
var isJpg = require('is-jpg');
var isProgressive = require('is-progressive');
var read = require('vinyl-file').read;
var test = require('ava');
var vinylSmallestJpeg = require('vinyl-smallest-jpeg');
var file = vinylSmallestJpeg();
var jpegRecompress = require('../');
var ExifImage = require('exif').ExifImage;

test('optimize a JPG', function (t) {
	t.plan(4);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = jpegRecompress()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size, data.contents.length);
			t.assert(isJpg(data.contents));
			t.assert(isProgressive.buffer(data.contents));
		});

		stream.end(file);
	});
});

test('support jpeg-recompress progress option', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = jpegRecompress({progressive: false})();

		stream.on('data', function (data) {
			t.assert(!isProgressive.buffer(data.contents));
		});

		stream.end(file);
	});
});

test('support jpeg-recompress strip option', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = jpegRecompress({strip: false})();

		stream.on('data', function (data) {
			new ExifImage(data.contents, function (error, exifData) {
				t.assert(exifData.image.Software === "imagemin-jpeg-recompress");
			});
		});

		stream.end(file);
	});
});

test('strip metadata by default', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = jpegRecompress()();

		stream.on('data', function (data) {
			new ExifImage(data.contents, function (error, exifData) {
				t.assert(!exifData);
			});
		});

		stream.end(file);
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(2);

	read(__filename, function (err, file) {
		t.assert(!err, err);

		var stream = jpegRecompress()();
		var contents = file.contents;

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, contents));
		});

		stream.end(file);
	});
});

test('skip optimizing an already optimized JPG', function (t) {
	t.plan(1);

	var stream = jpegRecompress({method: 'ms-ssim'})();

	stream.on('data', function (data) {
		t.assert(bufferEqual(data.contents, file.contents));
	});

	stream.end(file);
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(4);

	read(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = jpegRecompress()();

		stream.on('error', function (err) {
			t.assert(err, err);
			t.assert(path.basename(err.fileName) === 'test-corrupt.jpg', err.fileName);
			t.assert(/Corrupt JPEG data/.test(err.message), err.message);
		});

		stream.end(file);
	});
});
