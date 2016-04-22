# valerie [![Build Status](https://travis-ci.org/developerdizzle/valerie.svg?branch=master)](https://travis-ci.org/developerdizzle/valerie)

Simple javascript object validator

The goal of this project is to provide a simple, intuitive, extensible, independent, and isomorphic javascript object validation library.

## Usage

Import the function and built-in rules

```js
import createValidator from 'valerie';
import { required, number, range, oneOf } from 'valerie/rules';
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
import { equals } from 'valerie/rules';

const isTrue = equals(true, 'foo must be true');

isTrue(false); // 'value must be true';
isTrue(true); // undefined
```

## Built-in rules

### `equals(target, [message = "equals"])`

Tests if a value is equal (`===`) to a target value.

 - `target`: what the validated value should equal
 - `message`: optional custom error message

```js
const isTrue = equals(true, 'foo must be true');

const validate = createValidator({ foo: isTrue });

const errors = await validate({ foo: true });
```

### `hasProperty(property, [message = "hasProperty"])`

Tests if an object has a child property (`hasOwnProperty`)

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

### `number([message = "number"])`

Tests if a value is a number (`isNaN`).

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

Tests if a value is is valid against at least one rule within an `Array`

 - `rules`: array of rules to validate against
 - `message`: optional custom error message

```js
const isNumberOrX = or([number(), equals('x')], 'foo must be a number or the letter "x"');

const validate = createValidator({ foo: isNumberOrX });

const errors = await validate({ foo: 'x' );
```

### `range(min, max, [message = "range"])`

Tests if a value is between (`< and >`) two values.  Generally want to use with `number`

 - `min`: minimum value, exclusive
 - `max`: maximum value, exclusive
 - `message`: optional custom error message

```js
const isNumber = number('foo must be a number');
const isPositive = range(0, Infinity, foo 'must be a positive');

const validate = createValidator({ foo: [isNumber, isPositive] });

const errors = await validate({ foo: 100 });
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

### `required([message = "regex"])`

Tests if a value exists (not `undefined`, not an empty string, not an empty array)

 - `message`: optional custom error message

```js
const isRequired = required('foo is required');

const validate = createValidator({ foo: isRequired });

const errors = await validate({ foo: true );
```



## TODO:

* Include examples of client- and server-side usage
* Add more rules
