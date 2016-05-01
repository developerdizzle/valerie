'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var lessThan = function lessThan(target) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'lessThan' : arguments[1];

  return function (value) {
    if (value < target) return;

    return message;
  };
};

exports.default = lessThan;