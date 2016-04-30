'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isArray = function isArray() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? 'isArray' : arguments[0];

    return function (value) {
        if (Array.isArray(value)) return;

        return message;
    };
};

exports.default = isArray;