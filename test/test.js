'use strict';
var fs = require('fs');
var path = require('path');
var bufferEqual = require('buffer-equal');
var isJpg = require('is-jpg');
var isProgressive = require('is-progressive');
var test = require('ava');
var imageminJpegRecompress = require('../');

test('optimize a JPG', function (t) {
	t.plan(3);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.jpg'));

	imageminJpegRecompress()(buf).then(function (data) {
		t.assert(data.length < buf.length, data.length);
		t.assert(isJpg(data));
		t.assert(isProgressive.buffer(data));
	});
});

test('support jpeg-recompress options', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.jpg'));

	imageminJpegRecompress({progressive: false})(buf).then(function (data) {
		t.assert(!isProgressive.buffer(data));
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(__filename);

	imageminJpegRecompress()(buf).then(function (data) {
		t.assert(bufferEqual(data, buf));
	});
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test-corrupt.jpg'));

	imageminJpegRecompress()(buf).catch(function (err) {
		t.assert(/Corrupt JPEG data/.test(err.message), err.message);
	});
});
