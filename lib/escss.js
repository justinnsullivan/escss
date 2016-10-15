'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseCss = exports.Extend = exports.Element = exports.Id = exports.Class = exports.masterQueue = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion: 6 */


var _esCollections = require('es-collections');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var masterQueue = exports.masterQueue = new _esCollections.Queue();
var indent = '	';
var newline = '\n';

var Class = exports.Class = function () {
    function Class(name) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var mqs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var extensions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Class);

        this.name = name;
        this.base = base;
        this.type = 'class';
        this.mqs = {};
        this.extensions = {};
        for (var key in mqs) {
            this.mqs[key] = mqs[key];
        }
        for (key in extensions) {
            this.extensions[key.replace('&', '!$SELF$!')] = extensions[key];
        }
        masterQueue.enqueue(this);
    }

    _createClass(Class, [{
        key: 'addAttribute',
        value: function addAttribute(attribute, value) {
            this.base[attribute] = value;
        }
    }, {
        key: 'extend',
        value: function extend(object) {
            for (var key in object.base) {
                this.base[key] = object.base[key];
            }
            for (key in object.mqs) {
                this.mqs[key] = object.mqs[key];
            }
            for (key in object.extensions) {
                this.extensions[key] = object.extensions[key];
            }
        }
    }, {
        key: 'bemE',
        value: function bemE(newName) {
            return new Class(this.name + '__' + newName);
        }
    }, {
        key: 'bemM',
        value: function bemM(newName) {
            return new Class(this.name + '--' + newName);
        }
    }, {
        key: 'clearFix',
        value: function clearFix() {
            this.base['*zoom'] = '1';
            this.addExtension('&:before, &:after', { 'content': '""', 'display': 'table' });
            this.addExtension('&:after', { 'clear': "both" });
        }
    }, {
        key: 'visuallyHide',
        value: function visuallyHide() {
            this.base.margin = '-1px';
            this.base.padding = '0';
            this.base.width = '1px';
            this.base.height = '1px';
            this.base.overflow = 'hidden';
            this.base.clip = 'rect(0 0 0 0)';
            this.base.clip = 'rect(0, 0, 0, 0)';
            this.base.position = 'absolute';
        }
    }, {
        key: 'parse',
        value: function parse() {
            return parseObject(this, 'class');
        }
    }]);

    return Class;
}();

var Id = exports.Id = function () {
    function Id(name) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var mqs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var extensions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Id);

        this.name = name;
        this.base = base;
        this.type = 'id';
        this.mqs = {};
        this.extensions = {};
        for (var key in mqs) {
            this.mqs[key] = mqs[key];
        }
        for (key in extensions) {
            this.extensions[key.replace("&", '!$SELF$!')] = extensions[key];
        }
        masterQueue.enqueue(this);
    }

    _createClass(Id, [{
        key: 'addAttribute',
        value: function addAttribute(attribute, value) {
            this.base[attribute] = value;
        }
    }, {
        key: 'addExtension',
        value: function addExtension(extension, value) {
            this.extensions[extension] = value;
        }
    }, {
        key: 'extend',
        value: function extend(object) {
            for (var key in object.base) {
                this.base[key] = object.base[key];
            }
            for (key in object.mqs) {
                this.mqs[key] = object.mqs[key];
            }
            for (key in object.extensions) {
                this.extensions[key] = object.extensions[key];
            }
        }
    }, {
        key: 'bemE',
        value: function bemE(newName) {
            return new Id(this.name + '__' + newName);
        }
    }, {
        key: 'bemM',
        value: function bemM(newName) {
            return new Id(this.name + '--' + newName);
        }
    }, {
        key: 'clearFix',
        value: function clearFix() {
            this.addAttribute('*zoom', 1);
            this.addExtension('&:before, &:after', { 'content': '""', 'display': 'table' });
            this.addExtension(' &:after', { 'clear': "both" });
        }
    }, {
        key: 'visuallyHide',
        value: function visuallyHide() {
            this.base.margin = '-1px';
            this.base.padding = '0';
            this.base.width = '1px';
            this.base.height = '1px';
            this.base.overflow = 'hidden';
            this.base.clip = 'rect(0 0 0 0)';
            this.base.clip = 'rect(0, 0, 0, 0)';
            this.base.position = 'absolute';
        }
    }, {
        key: 'parse',
        value: function parse() {
            return parseObject(this, 'id');
        }
    }]);

    return Id;
}();

var Element = exports.Element = function () {
    function Element(name) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var mqs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var extensions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Element);

        this.name = name;
        this.base = base;
        this.type = 'element';
        this.mqs = {};
        this.extensions = {};
        for (var key in mqs) {
            this.mqs[key] = mqs[key];
        }
        for (key in extensions) {
            this.extensions[key.replace("&", '!$SELF$!')] = extensions[key];
        }
        masterQueue.enqueue(this);
    }

    _createClass(Element, [{
        key: 'addAttribute',
        value: function addAttribute(attribute, value) {
            this.base[attribute] = value;
        }
    }, {
        key: 'addExtension',
        value: function addExtension(extension, value) {
            this.extensions[extension] = value;
        }
    }, {
        key: 'extend',
        value: function extend(object) {
            for (var key in object.base) {
                this.base[key] = object.base[key];
            }
            for (key in object.mqs) {
                this.mqs[key] = object.mqs[key];
            }
            for (key in object.extensions) {
                this.extensions[key] = object.extensions[key];
            }
        }
    }, {
        key: 'clearFix',
        value: function clearFix() {
            this.addAttribute('*zoom', 1);
            this.addExtension('&:before, &:after', { 'content': '""', 'display': 'table' });
            this.addExtension(' &:after', { 'clear': "both" });
        }
    }, {
        key: 'visuallyHide',
        value: function visuallyHide() {
            this.base.margin = '-1px';
            this.base.padding = '0';
            this.base.width = '1px';
            this.base.height = '1px';
            this.base.overflow = 'hidden';
            this.base.clip = 'rect(0 0 0 0)';
            this.base.clip = 'rect(0, 0, 0, 0)';
            this.base.position = 'absolute';
        }
    }, {
        key: 'parse',
        value: function parse() {
            return parseObject(this, 'element');
        }
    }]);

    return Element;
}();

var Extend = exports.Extend = function () {
    function Extend(name) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var mqs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var extensions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Extend);

        this.name = name;
        this.base = base;
        this.type = 'extend';
        this.mqs = {};
        this.extensions = {};
        for (var key in mqs) {
            this.mqs[key] = mqs[key];
        }
        for (key in extensions) {
            this.extensions[key.replace("&", '!$SELF$!')] = extensions[key];
        }
    }

    _createClass(Extend, [{
        key: 'addAttribute',
        value: function addAttribute(attribute, value) {
            this.base[attribute] = value;
        }
    }, {
        key: 'addExtension',
        value: function addExtension(extension, value) {
            this.extensions[extension] = value;
        }
    }, {
        key: 'extend',
        value: function extend(object) {
            for (var key in object.base) {
                this.base[key] = object.base[key];
            }
            for (key in object.mqs) {
                this.mqs[key] = object.mqs[key];
            }
            for (key in object.extensions) {
                this.extensions[key] = object.extensions[key];
            }
        }
    }]);

    return Extend;
}();

var BaseCss = exports.BaseCss = function () {
    function BaseCss(name) {
        var css = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        _classCallCheck(this, BaseCss);

        this.name = name;
        this.css = css;
        masterQueue.enqueue(this);
    }

    _createClass(BaseCss, [{
        key: 'parse',
        value: function parse() {
            return this.css + newline;
        }
    }]);

    return BaseCss;
}();

function parseObject(object, type) {
    var prefix = '';
    switch (type) {
        case 'class':
            prefix = '.';
            break;
        case 'id':
            prefix = '#';
            break;
        case 'element':
            prefix = '';
            break;
    }
    var list = prefix + object.name + ' {' + newline;
    for (var property in object.base) {
        list += parseObjectAttribute(property, object.base[property], 1);
    }
    list += parseObjectExtensions(object.extensions, 1) + '}' + newline;
    return list.replace('!$SELF$!', prefix + object.name);
}

function parseObjectExtensions(extensions, ind_level) {
    var list = '';
    for (var ext in extensions) {
        list += parseObjectExtension(ext, extensions[ext], ind_level);
    }
    return list;
}

function parseObjectExtension(title, attributes, ind_level) {
    var list = indent.repeat(ind_level) + title + ' {' + newline;
    for (var name in attributes) {
        list += parseObjectAttribute(name, attributes[name], ind_level + 1);
    }
    list += indent.repeat(ind_level) + '}' + newline;
    return list;
}

function parseObjectAttribute(attribute, value, ind_level) {
    var list = '';
    if (typeof value == 'string') {
        list += indent.repeat(ind_level) + attribute + ': ' + value + ';' + newline;
    }
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
        list += parseObjectExtension(attribute, value, ind_level);
    }
    return list;
}