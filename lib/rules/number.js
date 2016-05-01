'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var number = function number() {
  var message = arguments.length <= 0 || arguments[0] === undefined ? 'number' : arguments[0];

  return function (value) {
    if (typeof value === 'undefined') return;

    if (isNaN(value)) return message;
  };
};

exports.default = number;