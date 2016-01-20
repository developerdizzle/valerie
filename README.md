# valerie [![Build Status](https://travis-ci.org/developerdizzle/valerie.svg?branch=master)](https://travis-ci.org/developerdizzle/valerie)

Simple javascript object validator

The goal of this project is to provide a simple, intuitive, extensible, independent, and isomorphic javascript object validation library.

## Usage

Object that we want to validate
```js
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
```js
var Valerie = require('valerie');
```

Assign some simple validators (or create your own).
```js
var rules = require('valerie/rules');

var required = rules.Required();
var number = rules.Number();
var validAge = rules.Range(1, 100);
var validColor = rules.OneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green'], 'invalid color');   //last parameter is a custom message!
```
These are functions that take a single value parameter, to validate, and return true (valid) or false (invalid)


Compose the validation schema for our object
```js
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

Create the object validator, which is a function taking a single object parameter, and returns an array containing the property paths and error messages errors, if any, or an empty array if there are no errors and our object is valid.
```js
var validate = new Valerie(schema);
```

Validate
```js
validate(input).then(errors) {
    console.log(errors);
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

validate(input, true).then(firstError) {
    console.log(firstError);
});

/*
[
    {
        property: 'name.last',
        message: 'required'
    }
]
*/

```

## TODO:

* Include examples of client- and server-side usage
* Add more rules
