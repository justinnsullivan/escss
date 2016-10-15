'use strict';

var _jscss = require('./jscss.js');

var _esCollections = require('es-collections');

/*jshint esversion: 6 */

var fs = require('fs');

require('./jscss.js');

var source = process.argv.splice(2)[0];

var target = source.substring(0, source.lastIndexOf('.')) + '.css';
source = '../lib/' + source.split('/').pop();
target = target.replace('/jscss/', '');

var exec = require('child_process').exec;
var cmd = 'npm run compile';
exec(cmd, function (error, stdout, stderr) {
    console.log(stdout);
    require(source);
    var stylesheet = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _jscss.masterQueue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            stylesheet += item.parse();
        }
        // stylesheet += '\n';
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

    console.log(source);

    fs.writeFile(target, stylesheet, function (err) {
        console.log(err);
    });
});