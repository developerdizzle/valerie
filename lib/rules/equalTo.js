'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var equalTo = function equalTo(target) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'equalTo' : arguments[1];

  return function (value) {
    /* eslint-disable eqeqeq */
    if (value == target) return;
    /* eslint-enable eqeqeq */

    return message;
  };
};

exports.default = equalTo;