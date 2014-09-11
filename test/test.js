'use strict';

var bufferEqual = require('buffer-equal');
var File = require('vinyl');
var fs = require('fs');
var isJpg = require('is-jpg');
var jpegRecompress = require('../');
var path = require('path');
var test = require('ava');

test('optimize a JPG', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test.jpg'), function (err, buf) {
		t.assert(!err);

		var stream = jpegRecompress();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isJpg(data.contents));
		});

		stream.end(file);
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(2);

	fs.readFile(__filename, function (err, buf) {
		t.assert(!err);

		var stream = jpegRecompress();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, buf));
		});

		stream.end(file);
	});
});

test('skip optimizing an already optimized JPG', function (t) {
	t.plan(2);

	fs.readFile(path.join(__dirname, 'fixtures/test-smallest.jpg'), function (err, buf) {
		t.assert(!err);

		var stream = jpegRecompress();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, buf));
		});

		stream.end(file);
	});
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, buf) {
		t.assert(!err);

		var stream = jpegRecompress();
		var file = new File({
			contents: buf
		});

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(/Corrupt JPEG data/.test(err.message));
		});

		stream.end(file);
	});
});
