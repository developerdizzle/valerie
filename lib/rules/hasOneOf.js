'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var hasOneOf = function hasOneOf(properties) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'hasOneOf' : arguments[1];

    return function (value) {
        if (typeof value === 'undefined') return;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var property = _step.value;

                if (value.hasOwnProperty(property)) return;
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

exports.default = hasOneOf;