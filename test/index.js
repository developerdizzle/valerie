var Validator = require('../src/index');

var required = Validator.required();
var number = Validator.number();
var validAge = Validator.range(1, 100);
var validColor = Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green']);

// simple control validator used for testing
var truth = function truth(value) {
    return value;
};

describe('object validator', function() {
    it('returns undefined if no errors', function() {
        var v = new Validator({
            foo: truth
        });
        
        var data = { 
            foo: true
        };
        
        var errors = v(data);
        
        expect(errors).not.toBeDefined();
    });

    it('includes subobjects in result if properties are not valid', function() {
        var v = new Validator({
            foo: {
                bar: truth,
                baz: {
                    quz: truth
                }
            }
        });
        
        var data = { };
        
        var errors = v(data);
        
        expect(errors.foo).toBeDefined();
        expect(errors.foo.baz).toBeDefined();
    });
    
    it('validates subobjects', function() {
        var v = new Validator({
            foo: {
                bar: truth,
                baz: truth
            }
        });
        
        var data = { 
            foo: {
                bar: true
            }
        };
        
        var errors = v(data);
        
        expect(errors.foo.bar).not.toBeDefined();
        expect(errors.foo.baz).toEqual(['truth']);
    });
});

describe('required validator', function() {
    it('passes if property has a value', function() {
        var v = new Validator({
            name: required
        });
        
        var data = {
            name: 'foo'
        };
        
        var errors = v(data);
        
        expect(errors).not.toBeDefined();
    });
    
    it('finds undefined properties', function() {
        var v = new Validator({
            name: required
        });
        
        var data = {};
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['required']);
    });

    it('finds empty strings', function() {
        var v = new Validator({
            name: required
        });
        
        var data = {
            name: ''
        };
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['required']);
    });

    it('finds empty arrays', function() {
        var v = new Validator({
            name: required
        });
        
        var data = {
            name: []
        };
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['required']);
    });

    it('can contain a custom message', function() {
        var v = new Validator({
            name: Validator.required('name is required')
        });
        
        var data = {
            name: []
        };
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['name is required']);
    });
    
    it('can contain a custom message with {property} parameter', function() {
        var v = new Validator({
            name: Validator.required('{property} is required')
        });
        
        var data = {
            name: []
        };
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['name is required']);
    });
});

describe('range validator', function() {
    it('finds an out-of-range property', function() {
        var v = new Validator({
            age: validAge
        });
        
        var data = {
            age: 200
        };
        
        var errors = v(data);
        
        expect(errors.age).toEqual(['range']);
    });

    it('does not validate if property is undefined', function() {
        var v = new Validator({
            age: validAge
        });
        
        var data = { };
        
        var errors = v(data);
        
        expect(errors).toEqual(undefined);
    });
});

describe('oneOf validator', function() {
    it('finds an out-of-array property', function() {
        var v = new Validator({
            color: validColor
        });
        
        var data = {
            color: 'magenta'
        };
        
        var errors = v(data);
        
        expect(errors.color).toEqual(['oneOf']);
    });

    it('does not validate if property is undefined', function() {
        var v = new Validator({
            color: validColor
        });
        
        var data = { };
        
        var errors = v(data);
        
        expect(errors).toEqual(undefined);
    });
});

describe('number validator', function() {
    it('finds an invalid number property', function() {
        var v = new Validator({
            age: number
        });
        
        var data = {
            age: 'potato'
        };
        
        var errors = v(data);
        
        expect(errors.age).toEqual(['number']);
    });

    it('does not validate if property is undefined', function() {
        var v = new Validator({
            age: number
        });
        
        var data = { };
        
        var errors = v(data);
        
        expect(errors).toEqual(undefined);
    });
});
