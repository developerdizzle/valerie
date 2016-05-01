'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

            return _context.abrupt('return', []);

          case 2:
            if (!(maximum === 0)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', []);

          case 4:
            return _context.abrupt('return', validateCount('', data, schema, maximum));

          case 5:
          case 'end':
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
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(parentPath) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var schemata = arguments[2];
    var maximum = arguments[3];

    var errors, keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, value, schema, path, rules, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, rule, message, schemaKeys, subErrors;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errors = [];

            // filter out array indices

            keys = Object.keys(schemata).filter(isNaN);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 5;
            _iterator = keys[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 58;
              break;
            }

            key = _step.value;
            value = data[key];
            schema = schemata[key];
            path = (parentPath ? parentPath + '.' : '') + key;

            // direct rules

            rules = [];

            if (typeof schema === 'function') rules = [schema];
            if (Array.isArray(schema)) rules = schema;

            // console.log(path, ' has ', rules.length, ' rules');

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 18;
            _iterator2 = rules[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 31;
              break;
            }

            rule = _step2.value;
            _context2.next = 24;
            return Promise.resolve(rule(value));

          case 24:
            message = _context2.sent;


            if (message) {
              errors.push({
                property: path,
                message: message
              });
            }

            if (!(errors.length >= maximum)) {
              _context2.next = 28;
              break;
            }

            return _context2.abrupt('return', errors);

          case 28:
            _iteratorNormalCompletion2 = true;
            _context2.next = 20;
            break;

          case 31:
            _context2.next = 37;
            break;

          case 33:
            _context2.prev = 33;
            _context2.t0 = _context2['catch'](18);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 37:
            _context2.prev = 37;
            _context2.prev = 38;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 40:
            _context2.prev = 40;

            if (!_didIteratorError2) {
              _context2.next = 43;
              break;
            }

            throw _iteratorError2;

          case 43:
            return _context2.finish(40);

          case 44:
            return _context2.finish(37);

          case 45:

            // sub schema
            schemaKeys = Object.keys(schema).filter(isNaN);

            if (!schemaKeys.length) {
              _context2.next = 55;
              break;
            }

            _context2.next = 49;
            return validateCount(path, value, schema, maximum);

          case 49:
            subErrors = _context2.sent;

            if (!subErrors.length) {
              _context2.next = 54;
              break;
            }

            errors = errors.concat(subErrors);

            if (!(errors.length >= maximum)) {
              _context2.next = 54;
              break;
            }

            return _context2.abrupt('return', errors);

          case 54:
            return _context2.abrupt('continue', 55);

          case 55:
            _iteratorNormalCompletion = true;
            _context2.next = 7;
            break;

          case 58:
            _context2.next = 64;
            break;

          case 60:
            _context2.prev = 60;
            _context2.t1 = _context2['catch'](5);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 64:
            _context2.prev = 64;
            _context2.prev = 65;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 67:
            _context2.prev = 67;

            if (!_didIteratorError) {
              _context2.next = 70;
              break;
            }

            throw _iteratorError;

          case 70:
            return _context2.finish(67);

          case 71:
            return _context2.finish(64);

          case 72:
            return _context2.abrupt('return', errors);

          case 73:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 60, 64, 72], [18, 33, 37, 45], [38,, 40, 44], [65,, 67, 71]]);
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
              return _context3.abrupt('return', validate(data, schema, maximum));

            case 1:
            case 'end':
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