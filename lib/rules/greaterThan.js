'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var greaterThan = function greaterThan(target) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'greaterThan' : arguments[1];

  return function (value) {
    if (value > target) return;

    return message;
  };
};

exports.default = greaterThan;