/*jshint esversion: 6 */
console.time("Duration");
import * as fs from 'fs';
import * as webpack from 'webpack';
import { Class, Id, Element, masterQueue } from './escss.js';

var pat = require('path').dirname(require.main.filename);
pat = pat.replace('/src', '');
pat = pat.replace('./', '');
var comm = process.argv.splice(2)
var source = pat + comm[0].replace('./', ''),
    print_src = comm[0];
source = source.replace('./', '');
var target = pat + '/' + comm[1].replace('./', ''),
    print_tar = comm[1];


require(source);
var stylesheet = '';
while (masterQueue.size != 0) {
    stylesheet += masterQueue.dequeue().parse();
}

fs.writeFile(target, stylesheet, function(err) {
    console.log('EScss compiled:   ' + print_src + ' -> ' + print_tar);
    var here = console.timeEnd("Duration");
});