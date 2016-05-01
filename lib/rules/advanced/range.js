'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../');

var range = function range(lower, upper) {
  var message = arguments.length <= 2 || arguments[2] === undefined ? 'range' : arguments[2];

  return function (value) {
    if (typeof value === 'undefined') return;

    var greaterThanOrEqualTo = (0, _.or)([(0, _.greaterThan)(lower), (0, _.equalTo)(lower)]);

    if (greaterThanOrEqualTo(value) !== undefined) return message;

    var lessThanOrEqualTo = (0, _.or)([(0, _.lessThan)(upper), (0, _.equalTo)(upper)]);

    if (lessThanOrEqualTo(value) !== undefined) return message;
  };
};

exports.default = range;