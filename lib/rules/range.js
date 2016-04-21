'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var range = function range(lower, upper) {
    var message = arguments.length <= 2 || arguments[2] === undefined ? 'range' : arguments[2];

    return function (value) {
        if (typeof value === 'undefined') return;

        if (value < lower || value > upper) return message;
    };
};

exports.default = range;