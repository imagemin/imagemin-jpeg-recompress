'use strict';

var ExecBuffer = require('exec-buffer');
var isJpg = require('is-jpg');
var jpegRecompress = require('jpeg-recompress-bin').path;

module.exports = function imageminJpegRecompress(opts = {}) {
  if (opts.strip === undefined) {
    opts.strip = true;
  }

  return function(file, imagemin, callback) {
    if (!isJpg(file.contents)) {
      return callback();
    }

    var exec = new ExecBuffer();

    var args = [exec.src(), exec.dest()];

    if (opts.target !== undefined && 0 <= opts.target && opts.target <= 1) {
      args.push('-t', opts.target);
    }
    if (typeof opts.quality === 'string') {
      args.push('-q', opts.quality);
    }
    if (opts.min !== undefined && 0 <= opts.min) {
      args.push('-n', opts.min);
    }
    if (opts.max !== undefined && 0 <= opts.max) {
      args.push('-x', opts.max);
    }
    if (opts.loops !== undefined && 0 <= opts.loops) {
      args.push('-l', opts.loops);
    }
    if (opts.accurate) {
      args.push('-a');
    }
    if (typeof opts.method === 'string') {
      args.push('-m', opts.method);
    }
    if (opts.strip) {
      args.push('-s');
    }
    if (opts.defish !== undefined && 0 <= opts.defish) {
      args.push('-d', opts.defish);
    }
    if (opts.zoom !== undefined && 0 <= opts.zoom) {
      args.push('-z', opts.zoom);
    }

    exec
    .use(jpegRecompress, args)
    .run(file.contents, (err, buf) => {
      if (err) {
        return callback(err);
      }

      file.contents = buf;
      callback();
    });
  };
};
