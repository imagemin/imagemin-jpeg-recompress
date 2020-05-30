const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const isJpg = require('is-jpg');
const isProgressive = require('is-progressive');
const test = require('ava');
const {ExifImage} = require('exif');
const m = require('.');

const readFile = promisify(fs.readFile);
const exifImageAsync = promisify(ExifImage);

test('optimize a JPG', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isJpg(data));
	t.true(isProgressive.buffer(data));
});

test('progressive option', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m({progressive: false})(buf);

	t.false(isProgressive.buffer(data));
});

test('strip option', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m({strip: false})(buf);

	t.is((await exifImageAsync(data)).image.Software, 'imagemin-jpeg-recompress');
});

test('strip metadata by default', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m()(buf);
	const error = await t.throwsAsync(() => exifImageAsync(data));

	t.is(error.message, 'No Exif segment found in the given image.');
});

test('skip optimizing a non-JPG file', async t => {
	const buf = await readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(data, buf);
});

test('throw error when a JPG is corrupt', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture-corrupt.jpg'));
	const error = await t.throwsAsync(() => m()(buf));

	t.regex(error.message, /Corrupt JPEG data/);
});
