'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var or = function or(rules) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'or' : arguments[1];

  return function (value) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;

        var error = rule(value);

        if (error === undefined) return;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return message;
  };
};

exports.default = or;