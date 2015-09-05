var Validator = require('../src/index');

var required = Validator.required();
var number = Validator.number();
var validAge = Validator.range(1, 100);
var validColor = Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green']);

// simple control validator used for testing
var truth = function truth(value) {
    return value;
};

describe('validator', function() {
    it('returns undefined if no errors', function() {
        var v = new Validator({
            foo: truth
        });
        
        var data = { 
            foo: true
        };
        
        var errors = v(data);
        
        expect(errors).toBe(undefined);
    });

    it('includes subobjects in result whether valid or not', function() {
        var v = new Validator({
            foo: {
                bar: truth,
                baz: truth
            }
        });
        
        var data = { };
        
        var errors = v(data);
        
        expect(errors.foo).toBeDefined();
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
        
        expect(errors.foo.bar).toEqual(undefined);
        expect(errors.foo.baz).toEqual(['truth']);
    });
});

describe('required validator', function() {
    it('finds a required property', function() {
        var v = new Validator({
            name: required
        });
        
        var data = {};
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['required']);
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
});
