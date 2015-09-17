# valerie [![Build Status](https://travis-ci.org/developerdizzle/valerie.svg?branch=master)](https://travis-ci.org/developerdizzle/valerie)

Simple javascript object validator

The goal of this project is to provide a simple, intuitive, extensible, independent, and isomorphic javascript object validation library.

## Usage

Object that we want to validate
```
var input = {
    id: 10,
    name: {
        first: 'foo'
    },
    age: 99,
    favoriteColor: 'potato'
}
```

Export the class
```
var Validator = require('./src/index');
```

Assign some simple validators (or create your own).
```
var required = Validator.required();
var number = Validator.number();
var validAge = Validator.range(1, 100);
var validColor = Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green']);
```
These are functions that take a single value parameter, to validate, and return true (valid) or false (invalid)


Compose the validation schema for our object
```
var schema = {
    id: [required, number],
    name: {
        first: required,
        last: required
    },
    age: validAge,
    favoriteColor: validColor
};
```

Create the object validator, which is a function taking a single object parameter, and returns another object containing the errors, if any, or `undefined`, if there are no errors and our object is valid.
```
var validate = new Validator(schema);
```

Validate
```
var errors = validate(input);

console.log(errors);
```

Output:
```
{
    name {
        last: 'required'
    },
    validColor: 'oneOf'
}
```

## TODO:

* Allow custom error messages
* Include exapmles of client- and server-side usage
* Add more rules
