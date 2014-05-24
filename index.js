'use strict';

var ExecBuffer = require('exec-buffer');
var imageType = require('image-type');
var jpegRecompress = require('jpeg-recompress-bin').path;
var tempfile = require('tempfile');

module.exports = (opts = {}) => {
  if (opts.strip === undefined) {
    opts.strip = true;
  }
  
  return function(file, imagemin, callback) {
    if (imageType(file.contents) !== 'jpg') {
      return callback();
    }

    var exec = new ExecBuffer();
    var args = [];
        
    exec.src(tempfile('.jpg'));
    exec.dest(tempfile('.jpg'));

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
      args.push('-m', opts.max);
    }
    if (opts.loops !== undefined && 0 <= opts.loops) {
      args.push('-l', opts.max);
    }
    if (opts.progressive) {
      args.push('-p');
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
    .use(jpegRecompress, args.concat([exec.src(), exec.dest()]))
    .run(file.contents, function(err, buf) {
      if (err) {
        return callback(err);
      }

      file.contents = buf;
      callback();
    });
  };
};
