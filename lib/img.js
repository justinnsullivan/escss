'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgCenter = exports.img = undefined;

var _jscss = require('./jscss.js');

var img = exports.img = new _jscss.Class('img', {
    'height': '200px',
    'width': '200px',
    'position': 'absolute'
}); /*jshint esversion: 6 */
var imgCenter = exports.imgCenter = img.bemM('center');

imgCenter.addAttribute('text-align', 'center');