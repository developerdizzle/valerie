var Validator = require('../src/index');

// simple control validator used for testing
var eq = function eq(target, message) {
    message = message || 'eq';
    
    return function(value) {
        if (value !== target) return message;
    };
};

var truth = eq(true, 'truth');

// tests
describe('object validator', function() {
    it('resolves undefined if there is no validation schema', function(done) {
        var v = new Validator({ });
        
        var data = { 
            foo: true
        };
        
        v(data).then(function(errors) {
            expect(errors).toBeUndefined();
    
            done();
        });
    });
    
    it('resolves empty array if there are no errors', function(done) {
        var v = new Validator({
            foo: truth
        });
        
        var data = { 
            foo: true
        };
        
        v(data).then(function(errors) {
            expect(errors.length).toBe(0);
    
            done();
        });
    });

    it('resolves with array of errors if there are any', function(done) {
        var v = new Validator({
            foo: truth
        });
        
        var data = { };
        
        v(data).then(function(errors) {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo',
                message: 'truth'
            });
    
            done();
        });
    });

    it('resolves a max of one error if stopOnFail is true', function(done) {
        var v = new Validator({
            foo: truth,
            bar: truth
        });
        
        var data = { };
        
        v(data, true).then(function(errors) {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo',
                message: 'truth'
            });
            
            done();
        });
    });
    
    it('validates subobjects', function(done) {
        var v = new Validator({
            foo: {
                bar: truth,
            }
        });
        
        var data = { };
        
        v(data).then(function(errors) {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo.bar',
                message: 'truth'
            });
            
            done();
        });
    });
    
    it('validates subobjects when stopOnFail is true', function(done) {
        var v = new Validator({
            foo: {
                bar: truth,
            }
        });
        
        var data = { };
        
        v(data, true).then(function(errors) {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo.bar',
                message: 'truth'
            });
            
            done();
        });
    });    
});

// var required = Validator.required();
// var number = Validator.number();
// var validAge = Validator.range(1, 100);
// var validColor = Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green']);

// describe('required validator', function() {
//     it('passes if property has a value', function() {
//         var v = new Validator({
//             name: required
//         });
        
//         var data = {
//             name: 'foo'
//         };
        
//         var errors = v(data);
        
//         expect(errors.length).toBe(0);
//     });
    
//     it('finds undefined properties', function() {
//         var v = new Validator({
//             name: required
//         });
        
//         var data = {};
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'name',
//             message: 'required'
//         });
//     });

//     it('finds empty strings', function() {
//         var v = new Validator({
//             name: required
//         });
        
//         var data = {
//             name: ''
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'name',
//             message: 'required'
//         });
//     });

//     it('finds empty arrays', function() {
//         var v = new Validator({
//             name: required
//         });
        
//         var data = {
//             name: []
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'name',
//             message: 'required'
//         });
//     });

//     it('can contain a custom message', function() {
//         var v = new Validator({
//             name: Validator.required('name is required')
//         });
        
//         var data = { };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'name',
//             message: 'name is required'
//         });
//     });

//     it('can contain a custom message as a function', function() {
//         var v = new Validator({
//             name: Validator.required(function(property) {
//                 return property + ' is required';
//             })
//         });
        
//         var data = { };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'name',
//             message: 'name is required'
//         });
//     });
// });

// describe('range validator', function() {
//     it('finds an out-of-range property', function() {
//         var v = new Validator({
//             age: validAge
//         });
        
//         var data = {
//             age: 200
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'age',
//             message: 'range'
//         });
//     });

//     it('does not validate if property is undefined', function() {
//         var v = new Validator({
//             age: validAge
//         });
        
//         var data = { };
        
//         var errors = v(data);
        
//         expect(errors.length).toEqual(0);
//     });

//     it('can contain a custom message', function() {
//         var v = new Validator({
//             age: Validator.range(0, 100, 'invalid age')
//         });
        
//         var data = { 
//             age: 200
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'age',
//             message: 'invalid age'
//         });
//     });

//     it('can contain a custom message as a function', function() {
//         var v = new Validator({
//             age: Validator.range(0, 100, function(property) {
//                 return 'invalid ' + property;
//             })
//         });
        
//         var data = { 
//             age: 200
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'age',
//             message: 'invalid age'
//         });
//     });
// });

// describe('oneOf validator', function() {
//     it('finds an out-of-array property', function() {
//         var v = new Validator({
//             color: validColor
//         });
        
//         var data = {
//             color: 'magenta'
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'color',
//             message: 'oneOf'
//         });
//     });

//     it('does not validate if property is undefined', function() {
//         var v = new Validator({
//             color: validColor
//         });
        
//         var data = { };
        
//         var errors = v(data);
        
//         expect(errors.length).toEqual(0);
//     });

//     it('can contain a custom message', function() {
//         var v = new Validator({
//             color: Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green'], 'invalid color')
//         });
        
//         var data = { 
//             color: 'potato'
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'color',
//             message: 'invalid color'
//         });
//     });

//     it('can contain a custom message as a function', function() {
//         var v = new Validator({
//             color: Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green'], function(property) {
//                 return 'invalid ' + property;
//             })
//         });
        
//         var data = { 
//             color: 'potato'
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'color',
//             message: 'invalid color'
//         });
//     });
// });

// describe('number validator', function() {
//     it('finds an invalid number property', function() {
//         var v = new Validator({
//             age: number
//         });
        
//         var data = {
//             age: 'potato'
//         };
        
//         var errors = v(data);
        
//         expect(errors[0]).toEqual({
//             property: 'age',
//             message: 'number'
//         });
//     });

//     it('does not validate if property is undefined', function() {
//         var v = new Validator({
//             age: number
//         });
        
//         var data = { };
        
//         var errors = v(data);
        
//         expect(errors.length).toEqual(0);
//     });
// });
