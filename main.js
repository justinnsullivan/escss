/*jshint esversion: 6 */

var fs = require('fs');

import { Class, Id, Element, masterQueue } from './src/master.js';
require ('./src/master.js');

import { Queue } from 'es-collections';
var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf('.')) + '.css';

fs.readFile(source, 'utf-8', function(err, data) {
    require(source);
    var stylesheet = '';
    for (let item of masterQueue) {
        stylesheet += item.parse();
    }
    stylesheet += '\n';
    console.log(stylesheet);
    if (err) throw err;

    fs.writeFile(target, stylesheet, function(err) {
        if (err) throw err;

        console.log('Wrote ' + target + '!');
    });
});
