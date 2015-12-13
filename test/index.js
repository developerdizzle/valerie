var Validator = require('../src/index');

var required = Validator.required();
var number = Validator.number();
var validAge = Validator.range(1, 100);
var validColor = Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green']);

// simple control validator used for testing
var truth = function truth(path, value) {
    var data = { path: path, message: 'truth' };
    
    return value ? Promise.resolve() : Promise.resolve(data);
};

// tests
describe('object validator', function() {
    it('resolves without errors if there are none', function(done) {
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

    it('resolves with errors if there are any', function(done) {
        var v = new Validator({
            foo: truth
        });
        
        var data = { };
        
        v(data).then(function(errors) {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                path: 'foo',
                message: 'truth'
            });
            done();
        });
    });

    // it('returns a max of one error if stopOnFail is true', function() {
    //     var v = new Validator({
    //         foo: truth,
    //         bar: truth,
    //         baz: truth
    //     });
        
    //     var data = { };
        
    //     var errors = v(data, true);
        
    //     expect(errors.length).toBe(1);
    // });
    
    // it('validates subobjects', function() {
    //     var v = new Validator({
    //         foo: {
    //             bar: truth,
    //             baz: truth
    //         }
    //     });
        
    //     var data = { 
    //         foo: {
    //             bar: true
    //         }
    //     };
        
    //     var errors = v(data);
        
    //     expect(errors[0]).toEqual({
    //         property: 'foo.baz',
    //         message: 'truth'
    //     });
    // });
});

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
