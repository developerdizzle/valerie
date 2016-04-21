"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var validate = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, schema, maximum) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(Object.keys(schema).length === 0)) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt("return", []);

                    case 2:
                        if (!(maximum === 0)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt("return", []);

                    case 4:
                        return _context.abrupt("return", validateCount("", data, schema, maximum));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function validate(_x, _x2, _x3) {
        return ref.apply(this, arguments);
    };
}();

var validateCount = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(path) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var schema = arguments[2];
        var maximum = arguments[3];

        var errors, key, value, rules, subPath, subErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rule, message;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        errors = [];
                        _context2.t0 = regeneratorRuntime.keys(schema);

                    case 2:
                        if ((_context2.t1 = _context2.t0()).done) {
                            _context2.next = 51;
                            break;
                        }

                        key = _context2.t1.value;
                        value = data[key];
                        rules = schema[key];
                        subPath = (path ? path + "." : "") + key;

                        // sub objects

                        if (!((typeof rules === "undefined" ? "undefined" : _typeof(rules)) === 'object' && !Array.isArray(rules))) {
                            _context2.next = 16;
                            break;
                        }

                        _context2.next = 10;
                        return validateCount(subPath, value, rules, maximum);

                    case 10:
                        subErrors = _context2.sent;

                        if (!subErrors.length) {
                            _context2.next = 15;
                            break;
                        }

                        errors = errors.concat(subErrors);

                        if (!(errors.length >= maximum)) {
                            _context2.next = 15;
                            break;
                        }

                        return _context2.abrupt("return", errors);

                    case 15:
                        return _context2.abrupt("continue", 2);

                    case 16:

                        // single validation rule - just convert it to an array and process it below
                        if (typeof rules === 'function') rules = [rules];

                        if (Array.isArray(rules)) {
                            _context2.next = 19;
                            break;
                        }

                        return _context2.abrupt("return", errors);

                    case 19:

                        // process actual validation rules
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 22;
                        _iterator = rules[Symbol.iterator]();

                    case 24:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 35;
                            break;
                        }

                        rule = _step.value;
                        _context2.next = 28;
                        return Promise.resolve(rule(value));

                    case 28:
                        message = _context2.sent;


                        if (message) errors.push({
                            property: subPath,
                            message: message
                        });

                        if (!(errors.length >= maximum)) {
                            _context2.next = 32;
                            break;
                        }

                        return _context2.abrupt("return", errors);

                    case 32:
                        _iteratorNormalCompletion = true;
                        _context2.next = 24;
                        break;

                    case 35:
                        _context2.next = 41;
                        break;

                    case 37:
                        _context2.prev = 37;
                        _context2.t2 = _context2["catch"](22);
                        _didIteratorError = true;
                        _iteratorError = _context2.t2;

                    case 41:
                        _context2.prev = 41;
                        _context2.prev = 42;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 44:
                        _context2.prev = 44;

                        if (!_didIteratorError) {
                            _context2.next = 47;
                            break;
                        }

                        throw _iteratorError;

                    case 47:
                        return _context2.finish(44);

                    case 48:
                        return _context2.finish(41);

                    case 49:
                        _context2.next = 2;
                        break;

                    case 51:
                        return _context2.abrupt("return", errors);

                    case 52:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[22, 37, 41, 49], [42,, 44, 48]]);
    }));

    return function validateCount(_x4, _x5, _x6, _x7) {
        return ref.apply(this, arguments);
    };
}();

var createValidator = function createValidator() {
    var schema = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var maximum = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt("return", validate(data, schema, maximum));

                        case 1:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x10, _x11) {
            return ref.apply(this, arguments);
        };
    }();
};

exports.default = createValidator;