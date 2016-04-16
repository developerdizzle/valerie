# valerie [![Build Status](https://travis-ci.org/developerdizzle/valerie.svg?branch=master)](https://travis-ci.org/developerdizzle/valerie)

Simple javascript object validator

The goal of this project is to provide a simple, intuitive, extensible, independent, and isomorphic javascript object validation library.

## Usage

Object that we want to validate
```js
const input = {
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
import Valerie from 'valerie';
```

Assign some simple validators (or create your own).
```js
import rules from 'valerie/rules';

const required = rules.required();
const number = rules.number();
const validAge = rules.range(1, 100);
const validColor = rules.oneOf(['blue', 'red', 'yellow'], 'invalid color');   //last parameter is a custom message!
```
These are functions that take a single value parameter, to validate, and return undefined (valid) or a string error message (invalid)


Compose the validation schema for our object
```js
const schema = {
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
const validate = new Valerie(schema);
```

Validate
```js
validate(input).then(errors => {
    // tell users about the errors!
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

validate(input, true).then(errors => {
    console.log(errors[0]);
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
