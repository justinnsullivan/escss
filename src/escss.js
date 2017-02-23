/*jshint esversion: 6 */
import { Queue } from 'es-collections';
export var masterQueue = new Queue();
const indent = '    ';
const newline = '\n';

export class Class {
    constructor(name, base = {}, mqs = {}, extensions = {}) {
        this.name = name;
        this.base = base;
        this.type = 'class';
        this.mqs = {};
        this.extensions = {};
        for (var key in mqs) {
            this.mqs[key] = mqs[key];
        }
        for (key in extensions) {
            var tem = key.replace('&', this.name);
            new Class(tem, extensions[key]);
        }

        masterQueue.enqueue(this);
    }
    addAttribute(attribute, value) {
        this.base[attribute] = value;
    }
    extend(object) {
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
    bemE(newName) {
        return new Class(this.name + '__' + newName);
    }
    bemM(newName) {
        return new Class(this.name + '--' + newName);
    }
    clearFix() {
        this.base['*zoom'] = '1';
        this.addExtension('&:before, &:after', { 'content': '""', 'display': 'table' });
        this.addExtension('&:after', { 'clear': "both" });
    }
    visuallyHide() {
        this.base.margin = '-1px';
        this.base.padding = '0';
        this.base.width = '1px';
        this.base.height = '1px';
        this.base.overflow = 'hidden';
        this.base.clip = 'rect(0 0 0 0)';
        this.base.clip = 'rect(0, 0, 0, 0)';
        this.base.position = 'absolute';
    }
    parse() {
        return parseObject(this, 'class');
    }
}

export class Id {
    constructor(name, base = {}, mqs = {}, extensions = {}) {
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
    addAttribute(attribute, value) {
        this.base[attribute] = value;
    }
    addExtension(extension, value) {
        this.extensions[extension] = value;
    }
    extend(object) {
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
    bemE(newName) {
        return new Id(this.name + '__' + newName);
    }
    bemM(newName) {
        return new Id(this.name + '--' + newName);
    }
    clearFix() {
        this.addAttribute('*zoom', 1);
        this.addExtension('&:before, &:after', { 'content': '""', 'display': 'table' });
        this.addExtension(' &:after', { 'clear': "both" });
    }
    visuallyHide() {
        this.base.margin = '-1px';
        this.base.padding = '0';
        this.base.width = '1px';
        this.base.height = '1px';
        this.base.overflow = 'hidden';
        this.base.clip = 'rect(0 0 0 0)';
        this.base.clip = 'rect(0, 0, 0, 0)';
        this.base.position = 'absolute';
    }
    parse() {
        return parseObject(this, 'id');
    }
}

export class Element {
    constructor(name, base = {}, mqs = {}, extensions = {}) {
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
    addAttribute(attribute, value) {
        this.base[attribute] = value;
    }
    addExtension(extension, value) {
        this.extensions[extension] = value;
    }
    extend(object) {
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
    clearFix() {
        this.addAttribute('*zoom', 1);
        this.addExtension('&:before, &:after', { 'content': '""', 'display': 'table' });
        this.addExtension(' &:after', { 'clear': "both" });
    }
    visuallyHide() {
        this.base.margin = '-1px';
        this.base.padding = '0';
        this.base.width = '1px';
        this.base.height = '1px';
        this.base.overflow = 'hidden';
        this.base.clip = 'rect(0 0 0 0)';
        this.base.clip = 'rect(0, 0, 0, 0)';
        this.base.position = 'absolute';
    }
    parse() {
        return parseObject(this, 'element');
    }
}

export class Extend {
    constructor(name, base = {}, mqs = {}, extensions = {}) {
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
    addAttribute(attribute, value) {
        this.base[attribute] = value;
    }
    addExtension(extension, value) {
        this.extensions[extension] = value;
    }
    extend(object) {
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
}

export class BaseCss {
    constructor(name, css = '') {
        this.name = name;
        this.css = css;
        masterQueue.enqueue(this);
    }
    parse() {
        return this.css + newline;
    }
}

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
    return list.replace('!$SELF$!', (prefix + object.name));
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
    if (typeof(value) == 'string') {
        list += indent.repeat(ind_level) + attribute + ': ' + value + ';' + newline;
    }
    if (typeof(value) == 'object') {
        list += parseObjectExtension(attribute, value, ind_level);
    }
    return list;
}
