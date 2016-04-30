'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = exports.regex = exports.range = exports.or = exports.oneOf = exports.number = exports.hasProperty = exports.equals = undefined;

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

var _hasProperty = require('./hasProperty');

var _hasProperty2 = _interopRequireDefault(_hasProperty);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _oneOf = require('./oneOf');

var _oneOf2 = _interopRequireDefault(_oneOf);

var _or = require('./or');

var _or2 = _interopRequireDefault(_or);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

var _required = require('./required');

var _required2 = _interopRequireDefault(_required);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
import isArray from './isArray';
import isInstanceOf from './isInstanceOf';
import isTypeOf from './isTypeOf';
*/


console.log('about to export rules');

exports.equals = _equals2.default;
exports.hasProperty = _hasProperty2.default;
exports.number = _number2.default;
exports.oneOf = _oneOf2.default;
exports.or = _or2.default;
exports.range = _range2.default;
exports.regex = _regex2.default;
exports.required = _required2.default;