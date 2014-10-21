'use strict';

var bufferEqual = require('buffer-equal');
var isJpg = require('is-jpg');
var jpegRecompress = require('../');
var path = require('path');
var read = require('vinyl-file').read;
var smallestJpeg = require('vinyl-smallest-jpeg');
var test = require('ava');

test('optimize a JPG', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err);

		var stream = jpegRecompress();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isJpg(data.contents));
		});

		stream.end(file);
	});
});

test('optimize a JPG using ctor', function (t) {
	t.plan(2);

	var JpegRecompress = jpegRecompress.ctor();

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err);

		var stream = new JpegRecompress();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isJpg(data.contents));
		});

		stream.end(file);
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(2);

	read(__filename, function (err, file) {
		t.assert(!err);

		var stream = jpegRecompress();
		var contents = file.contents;

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, contents));
		});

		stream.end(file);
	});
});

test('skip optimizing an already optimized JPG', function (t) {
	t.plan(1);

	var file = smallestJpeg();
	var stream = jpegRecompress();

	stream.on('data', function (data) {
		t.assert(bufferEqual(data.contents, file.contents));
	});

	stream.end(file);
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, file) {
		t.assert(!err);

		var stream = jpegRecompress();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(/Corrupt JPEG data/.test(err.message));
		});

		stream.end(file);
	});
});
