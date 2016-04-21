'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var equals = function equals(target) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'equals' : arguments[1];

    return function (value) {
        if (value !== target) return message;
    };
};

exports.default = equals;