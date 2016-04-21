'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var oneOf = function oneOf(options) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'oneOf' : arguments[1];

    return function (value) {
        if (typeof value === 'undefined') return;

        if (options.indexOf(value) === -1) return message;
    };
};

exports.default = oneOf;