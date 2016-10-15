/*jshint esversion: 6 */

var fs = require('fs');

import { Class, Id, Element, masterQueue } from './jscss.js';
require('./jscss.js');

import { Queue } from 'es-collections';
var source = process.argv.splice(2)[0];

var target = source.substring(0, source.lastIndexOf('.')) + '.css';
source = '../lib/' + source.split('/').pop();
target = target.replace('/jscss/','');

    var exec = require('child_process').exec;
    var cmd = 'npm run compile';
    exec(cmd, function(error, stdout, stderr) {
        console.log(stdout);
        require(source);
        var stylesheet = '';
        for (let item of masterQueue) {
            stylesheet += item.parse();
        }
        // stylesheet += '\n';
        console.log(source);

        fs.writeFile(target, stylesheet, function(err) {
            console.log(err);
        });
    });

