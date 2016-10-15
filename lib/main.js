'use strict';

var _escss = require('./escss.js');

var _esCollections = require('es-collections');

/*jshint esversion: 6 */
console.time("Duration");
var fs = require('fs');

require('./escss.js');

var source = process.argv.splice(2)[0];

var target = source.substring(0, source.lastIndexOf('.')) + '.css';
var original = source;
source = '../lib/' + source.split('/').pop();
target = target.replace('/escss/', '');

var exec = require('child_process').exec;
var cmd = 'npm run compile';
console.log('Compiling.....');
exec(cmd, function (error, stdout, stderr) {

    require(source);
    var stylesheet = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _escss.masterQueue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            stylesheet += item.parse();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    fs.writeFile(target, stylesheet, function (err) {
        console.log('EScss compiled:   ' + original + ' -> ' + target);
        var here = console.timeEnd("Duration");
    });
});