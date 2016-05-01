'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isInstanceOf = function isInstanceOf(type) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'isInstanceOf' : arguments[1];

  return function (value) {
    if (typeof value === 'undefined') return;
    if (value instanceof type) return;

    return message;
  };
};

exports.default = isInstanceOf;