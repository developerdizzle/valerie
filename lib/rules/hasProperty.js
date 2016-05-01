'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasProperty = function hasProperty(property) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'hasProperty' : arguments[1];

  return function (value) {
    if (typeof value === 'undefined') return;

    if (!value.hasOwnProperty(property)) return message;
  };
};

exports.default = hasProperty;