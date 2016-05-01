'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var regex = function regex(expression) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'regex' : arguments[1];

  return function (value) {
    if (typeof value === 'undefined') return;

    var matches = value.match(expression);

    if (!matches) return message;
  };
};

exports.default = regex;