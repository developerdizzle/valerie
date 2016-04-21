'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var required = function required() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? 'required' : arguments[0];

    return function (value) {
        if (typeof value === 'undefined') return message;

        if (typeof value === 'string' && (value === '' || value.trim() === '')) return message;

        if (Array.isArray(value) && value.length === 0) return message;
    };
};

exports.default = required;