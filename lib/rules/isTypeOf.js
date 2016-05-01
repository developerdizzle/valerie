'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var isTypeOf = function isTypeOf(type) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'isTypeOf' : arguments[1];

  return function (value) {
    if (typeof value === 'undefined') return;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type) return;

    return message;
  };
};

exports.default = isTypeOf;