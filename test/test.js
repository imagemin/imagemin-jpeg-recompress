'use strict';

var fs = require('fs');
var Imagemin = require('imagemin');
var isJpg = require('is-jpg');
var jpegRecompress = require('../');
var path = require('path');
var test = require('ava');

test('optimize a JPG', function (t) {
	t.plan(4);

	var imagemin = new Imagemin()
		.src(path.join(__dirname, 'fixtures/test.jpg'))
		.use(jpegRecompress());

	imagemin.optimize(function (err, file) {
		t.assert(!err);

		fs.stat(imagemin.src(), function (err, stats) {
			t.assert(!err);
			t.assert(file.contents.length < stats.size);
			t.assert(isJpg(file.contents));
		});
	});
});

test('should skip optimizing an already optimized JPG', function (t) {
	t.plan(4);

	var imagemin = new Imagemin()
		.src(path.join(__dirname, 'fixtures/test-smallest.jpg'))
		.use(jpegRecompress());

	imagemin.optimize(function (err, file) {
		t.assert(!err);

		fs.stat(imagemin.src(), function (err, stats) {
			t.assert(!err);
			t.assert(file.contents.length === stats.size);
			t.assert(file.contents.length > 0);
		});
	});
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(2);

	var imagemin = new Imagemin()
		.src(path.join(__dirname, 'fixtures/test-corrupt.jpg'))
		.use(jpegRecompress());

	imagemin.optimize(function (err) {
		t.assert(err);
		t.assert(/Corrupt JPEG data/.test(err.message));
	});
});
