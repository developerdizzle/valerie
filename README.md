# valerie [![Build Status](https://travis-ci.org/developerdizzle/valerie.svg?branch=master)](https://travis-ci.org/developerdizzle/valerie) [![devDependency Status](https://david-dm.org/developerdizzle/valerie.svg)](https://david-dm.org/developerdizzle/valerie) [![devDependency Status](https://david-dm.org/developerdizzle/valerie/dev-status.svg)](https://david-dm.org/developerdizzle/valerie#info=devDependencies)

Simple javascript object validator

The goal of this project is to provide a simple, intuitive, extensible, independent, and isomorphic javascript object validation library.

## Usage

Import the function and built-in rules

```js
import createValidator from 'valerie';
import { required, number, oneOf } from 'valerie/rules';
import { range } from 'valerie/rules/advanced';
```

Compose the validation schema for our object

```js
const schema = {
    id: [required(), number()],
    name: {
        first: required(),
        last: required()
    },
    age: range(0, 123),
    favoriteColor: oneOf(['blue', 'red', 'yellow'], 'invalid color')   //last parameter is a custom message!
};
```

Create the object validator, which is a function taking a single object parameter, and returns a Promise which resolves an array containing errors.  The array will be empty if there are no errors.

```js
const validate = createValidator(schema);
```

Validate
```js

const input = {
    id: 10,
    name: {
        first: 'foo'
    },
    age: 99,
    favoriteColor: 'potato'
};

// ES7
const errors = await validate(input);

// ES6
validate(input).then(errors => {
    // tell the user about the errors!
})

// ES5
validate(input).then(function(errors) {
    // tell the user about the errors!
});

/*
[
    {
        property: 'name.last',
        message: 'required'
    },
    {
        property: 'favoriteColor',
        message: 'invalid color'
    }
]
*/

// or just get the first error
const errors = await validate(input, 1);

/*
[
    {
        property: 'name.last',
        message: 'required'
    }
]
*/

```

## Rules

Validation rules are just simple functions that take a single input, the value to validate, and return `undefined` if valid, or an error message if not.

The built-in rule objects exported from `valerie/rules` are functions that take a set of options and return the rule function itself.

Example:

```js
import { is } from 'valerie/rules';

const isTrue = is(true, 'value must be true');

isTrue(false); // 'value must be true';
isTrue(true); // undefined
```

## Built-in rules

The built-in rules are largely based on the fundamental javascript operations.

### `array([message = "array"])`

Tests if a value is an array (`Array.isArray`).

 - `message`: optional custom error message

```js
const isArray = array('foo must be an array');

const validate = createValidator({ foo: isArray });

const errors = await validate({ foo: ['bar', 'baz'] });
```

### `equalTo(target, [message = "equalTo"])`

Tests if a value is loosely equal (`==`) to a target value.

 - `target`: what the validated value should equal
 - `message`: optional custom error message

```js
const isBar = equalTo('bar', 'foo must be bar');

const validate = createValidator({ foo: isBar });

const errors = await validate({ foo: new String('bar') });
```

### `greaterThan(target, [message = "greaterThan"])`

Tests if a value is greater than (`>`) a target value.

 - `target`: what the validated value should be greater than
 - `message`: optional custom error message

```js
const isPositive = greaterThan(0, 'foo must be positive');

const validate = createValidator({ foo: isPositive });

const errors = await validate({ foo: 1 });
```

### `hasProperty(property, [message = "hasProperty"])`

Tests if an object has a child property (`hasOwnProperty`).

 - `property`: name of the property
 - `message`: optional custom error message

```js
const hasBar = hasProperty('bar', 'foo must have bar property');

const validate = createValidator({ foo: hasBar });

const errors = await validate({
    foo: {
        bar: true
    }
});
```

### `is(target, [message = "is"])`

Tests if a value is strictly equal (`===`) to a target value.

 - `target`: what the validated value should equal
 - `message`: optional custom error message

```js
const isBar = equalTo('bar', 'foo must be bar');

const validate = createValidator({ foo: isBar });

const errors = await validate({ foo: 'bar' });
```

### `isInstanceOf(type, [message = "isInstanceOf"])`

Tests if a value is an instance of a class (`instanceof`).

 - `type`: what the validated value should be an instance of
 - `message`: optional custom error message

```js
const isBar = isInstanceOf(Bar, 'foo must be bar');

const validate = createValidator({ foo: isBar });

const errors = await validate({ foo: new Bar() });
```

### `isTypeOf(type, [message = "isTypeOf"])`

Tests if a value is of a given type (`typeof`).

 - `type`: what the validated value should be a type of
 - `message`: optional custom error message

```js
const isString = isTypeOf(Bar, 'foo must be a string');

const validate = createValidator({ foo: isString });

const errors = await validate({ foo: 'bar' });
```

### `lessThan(target, [message = "lessThan"])`

Tests if a value is less than (`<`) a target value.

 - `target`: what the validated value should be less than
 - `message`: optional custom error message

```js
const isNegative = lessThan(0, 'foo must be negative');

const validate = createValidator({ foo: isNegative });

const errors = await validate({ foo: -1 });
```

### `number([message = "number"])`

Tests if a value is a number (`!isNaN`).

 - `message`: optional custom error message

```js
const isNumber = number(foo 'must be a number');

const validate = createValidator({ foo: isNumber });

const errors = await validate({ foo: Math.PI });
```

### `oneOf(options, [message = "oneOf"])`

Tests if a value is equal to (`===`) an item in an `Array`.

 - `options`: array of items to check against
 - `message`: optional custom error message

```js
const isPrimaryColor = oneOf(['red', 'blue', 'yellow'], 'foo must be a primary color');

const validate = createValidator({ foo: isPrimaryColor });

const errors = await validate({ foo: 'blue' });
```

### `or(rules, [message = "or"])`

Tests if a value is is valid against at least one rule within an `Array` of rules.

 - `rules`: array of rules to validate against
 - `message`: optional custom error message

```js
const isNumberOrX = or([number(), equals('x')], 'foo must be a number or the letter "x"');

const validate = createValidator({ foo: isNumberOrX });

const errors = await validate({ foo: 'x' );
```

### `regex(pattern, [message = "regex"])`

Tests if a value matches a regex (`.match`)

 - `pattern`: regexp (`RegExp` or `/pattern/`)
 - `message`: optional custom error message

```js
const isEMail = regex(/^\S+@\S+$/, 'foo must be an email address');

const validate = createValidator({ foo: isEMail });

const errors = await validate({ foo: 'bar@baz.com' });
```

### `required([message = "required"])`

Tests if a value exists (not `undefined`, not an empty string, not an empty array)

 - `message`: optional custom error message

```js
const isRequired = required('foo is required');

const validate = createValidator({ foo: isRequired });

const errors = await validate({ foo: true );
```

## Advanced Rules

Advanced rules use the built-in rules to form more complex logic

### `range(min, max, [message = "range"])`

Tests if a value is between two values.  Generally want to use with `number`.  Depends on `greaterThan`, `lessThan`, `equalTo`, and `or`.

 - `min`: minimum value, inclusive
 - `max`: maximum value, inclusive
 - `message`: optional custom error message

```js
const isNumber = number('foo must be a number');
const isHumanAge = range(0, 123, 'foo must be a human age');

const validate = createValidator({ foo: [isNumber, isHumanAge] });

const errors = await validate({ foo: 100 });
```


## TODO:

* Rules
    * `contains`
    * `email`
* Examples of client- and server-side usage
* Example of promise rule
* Add custom messages to readme example
* Compare to other libs
    * https://github.com/hapijs/joi (large)
    * https://github.com/molnarg/js-schema (no custom messages)
    * https://github.com/ansman/validate.js 