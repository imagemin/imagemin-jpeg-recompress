'use strict';

var isJpg = require('is-jpg');
var jpegRecompress = require('jpeg-recompress-bin').path;
var spawn = require('child_process').spawn;

/**
 * jpegrecompress image-min plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return function (file, imagemin, cb) {
		if (!isJpg(file.contents)) {
			cb();
			return;
		}

		var args = ['-', '-', '-s'];
		var ret = [];
		var len = 0;
		var msg;

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

		cp.on('error', function(err) {
			cb(err);
			return;
		});

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			msg = data;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('close', function (code) {
			if (code) {
				cb(new Error(msg));
				return;
			}

			file.contents = Buffer.concat(ret, len);
			cb();
		});

		cp.stdin.end(file.contents);
	};
};
