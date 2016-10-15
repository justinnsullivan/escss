'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dad = exports.mom = undefined;

var _jscss = require('./jscss.js');

var yellow = '#ef4'; /*jshint esversion: 6 */
var mom = exports.mom = new _jscss.Class('mom', {
    'font-size': '12px',
    'font': 'Avenir',
    'color': 'green'
}, {
    '640px': {
        'font-size': '14px'
    }
}, {
    'p': {
        'color': yellow
    },
    '&.index': {
        'color': 'coral',
        'div': {
            'background-color': 'yellow'
        }
    }
});

// example mixin
// function transition
function transitions(object, args) {
    object.addAttribute('-webkit-transition', args);
    object.addAttribute('-moz-transition', args);
    object.addAttribute('-ms-transition', args);
    object.addAttribute('-0-transition', args);
    object.addAttribute('transition', args);
}

var css = new _jscss.BaseCss('css', '.btn {padding: 15px 30px;cursor: pointer;border: 0;width: 30%;text-align: center;border-radius: 4px;color: green;text-transform: uppercase;font-size: 28px;font-weight: 800;transition: opacity 0.5s;display: block;}');
var dad = exports.dad = new _jscss.Id('dad');
dad.extend(mom);
dad.addAttribute('padding-top', '10px');
transitions(dad, 'opacity 0.5, width 1s');