'use strict';

var isJpg = require('is-jpg');
var jpegRecompress = require('jpeg-recompress-bin').path;
var spawn = require('child_process').spawn;
var through = require('through2');

/**
 * jpeg-recompress imagemin plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({ objectMode: true }, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isJpg(file.contents)) {
			cb(null, file);
			return;
		}

		var args = ['-', '-', '-s'];
		var err = '';
		var ret = [];
		var len = 0;

		if (opts.accurate) {
			args.push('-a');
		}

		if (opts.quality) {
			args.push('-q', opts.quality);
		}

		if (opts.method) {
			args.push('-m', opts.method);
		}

		if (opts.target) {
			args.push('-t', opts.target);
		}

		if (opts.min) {
			args.push('-n', opts.min);
		}

		if (opts.max) {
			args.push('-x', opts.max);
		}

		if (opts.loops) {
			args.push('-l', opts.loops);
		}

		if (opts.defish) {
			args.push('-d', opts.defish);
		}

		if (opts.zoom) {
			args.push('-z', opts.zoom);
		}

		var cp = spawn(jpegRecompress, args);

		cp.on('error', function (err) {
			cb(err);
			return;
		});

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			err += data;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('close', function (code) {
			if (code) {
				cb(new Error(err));
				return;
			}

			file.contents = Buffer.concat(ret, len);
			cb(null, file);
		});

		cp.stdin.end(file.contents);
	});
};
