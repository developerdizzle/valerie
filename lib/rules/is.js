'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var is = function is(target) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'is' : arguments[1];

  return function (value) {
    if (value === target) return;

    return message;
  };
};

exports.default = is;