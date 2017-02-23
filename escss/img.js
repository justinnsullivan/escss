/*jshint esversion: 6 */
import { Class } from '../src/escss.js';

export var img = new Class(
    'img', {
        'height': '200px',
        'width': '200px',
        'position': 'absolute'
    }
);

export var imgCenter = img.bemM('center');

imgCenter.addAttribute('text-align', 'center');