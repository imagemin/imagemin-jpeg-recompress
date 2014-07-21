'use strict';

var assert = require('assert');
var path = require('path');

var Bluebird = require('bluebird');
var chalk = require('chalk');
var maxmin = require('maxmin');

var Imagemin = require('imagemin');
Imagemin.prototype.optimizePromise = Bluebird.promisify(Imagemin.prototype.optimize);

var jpegRecompress = require('require-main')();

var readFile = Bluebird.promisify(require('fs').readFile);

function getBuffersPromise(imagemin, callback) {
  return Bluebird.all([
    readFile(imagemin.src()),
    imagemin.optimizePromise()
  ]).spread(function(srcBuf, file) {
    callback(srcBuf, file.contents);
  });
}

function printOptimizeResult(filePath, srcBuf, destBuf) {
  var jpgname = path.basename(filePath);
  console.log(`      ${chalk.cyan(jpgname)}: ${maxmin(srcBuf, destBuf, false)}`);
}

describe('jpegRecompress()', () => {
  it('should optimize a JPEG.', () => {
    let imagemin = new Imagemin();

    imagemin
    .src('test/fixture.jpg')
    .use(jpegRecompress({
      target: 0.999,
      min: 95,
      max: 96,
      loops: 1,
      progressive: true
    }));

    return getBuffersPromise(imagemin, (srcBuf, destBuf) => {
      assert(destBuf.length < srcBuf.length);
      assert(destBuf.length > 0);
      printOptimizeResult(imagemin.src(), srcBuf, destBuf);
    });
  });
  it('should pass an already optimized JPEG as it is.', () => {
    let imagemin = new Imagemin();

    imagemin
    .src('test/fixture-small.jpg')
    .use(jpegRecompress({
      target: 0.001,
      max: 1,
      loops: 1,
      defish: 0.7,
      zoom: 10
    }));

    return getBuffersPromise(imagemin, (srcBuf, destBuf) => {
      assert.strictEqual(destBuf.length, srcBuf.length);
      printOptimizeResult(imagemin.src(), srcBuf, destBuf);
    });
  });
  it('should throw an error when the JPEG is corrupt.', done => {
    new Imagemin()
    .src('test/fixture-broken.jpg')
    .use(jpegRecompress())
    .optimize(err => {
      if (err.code !== 2) {
        done();
        return;
      }
      done(err);
    });
  });
});
