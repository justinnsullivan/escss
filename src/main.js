/*jshint esversion: 6 */
console.time("Duration");
var fs = require('fs');
import { Class, Id, Element, masterQueue } from './escss.js';
require('./escss.js');

import { Queue } from 'es-collections';
var source = process.argv.splice(2)[0];

var target = source.substring(0, source.lastIndexOf('.')) + '.css';
var original = source;
source = '../lib/' + source.split('/').pop();
target = target.replace('/escss/', '');

var exec = require('child_process').exec;
var cmd = 'npm run compile';
console.log('Compiling.....');
exec(cmd, function(error, stdout, stderr) {

    require(source);
    var stylesheet = '';
    for (let item of masterQueue) {
        stylesheet += item.parse();
    }

    fs.writeFile(target, stylesheet, function(err) {
        console.log('EScss compiled:   ' + original + ' -> ' + target);
        var here = console.timeEnd("Duration");
    });
});
