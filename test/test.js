'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var Imagemin = require('imagemin');
var Q = require('q');
var maxmin = require('maxmin');

var pkg = require(path.join(process.cwd(), 'package.json'));
var jpegRecompress = require(path.join(process.cwd(), pkg.main));

var readFile = Q.denodeify(fs.readFile);

describe('jpegRecompress()', () => {
  var message;
  after(() => console.log(message));
  
  it('should optimize a JPEG', () => {
    var imagemin = new Imagemin();
    var optimizeDeferred = Q.defer();

    imagemin
    .src(path.join(process.cwd(), 'test/fixture.jpg'))
    .use(jpegRecompress({
      target: 0.999,
      min: 95,
      max: 96,
      progressive: true
    }))
    .optimize((err, file) => {
      if (err) {
        optimizeDeferred.reject(new Error(err));
      } else {
        optimizeDeferred.resolve(file.contents);
      }
    });
    
    var result;
    
    return Q.all([
      readFile(imagemin.src()),
      optimizeDeferred.promise
    ]).spread((srcBuf, destBuf) => {
      assert(destBuf.length < srcBuf.length);
      assert(destBuf.length > 0);
      message = '    test/fixture.jpg: ' + maxmin(srcBuf, destBuf, false);
    });
  });
});
