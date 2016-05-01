'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var array = function array() {
  var message = arguments.length <= 0 || arguments[0] === undefined ? 'array' : arguments[0];

  return function (value) {
    if (typeof value === 'undefined') return;

    if (Array.isArray(value)) return;

    return message;
  };
};

exports.default = array;