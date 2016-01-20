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

var rules = require('../src/rules');

describe('required validator', function() {
    it('passes if property has a value', function() {
        var rule = new rules.Required();
        
        var error = rule('foo');
        
        expect(error).toBeUndefined();
    });
    
    it('finds undefined values', function() {
        var rule = new rules.Required();
        
        var error = rule(undefined);
        
        expect(error).toEqual('required');
    });

    it('finds empty strings', function() {
        var rule = new rules.Required();
        
        var error = rule('');
        
        expect(error).toEqual('required');        
    });

    it('finds empty arrays', function() {
        var rule = new rules.Required();
        
        var error = rule([]);
        
        expect(error).toEqual('required'); 
    });

    it('can contain a custom message', function() {
        var rule = new rules.Required('name is required');
        
        var error = rule(undefined);
        
        expect(error).toEqual('name is required');
    });
});

// number

describe('number validator', function() {
    it('passes if value is a number', function() {
        var rule = new rules.Number();
        
        console.log('rule', rule);
        
        var error = rule(5);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', function() {
        var rule = new rules.Number();
        
        var error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an invalid number property', function() {
        var rule = new rules.Number();
        
        var error = rule('foo');
        
        expect(error).toEqual('number');
    });
    
    it('can contain a custom message', function() {
        var rule = new rules.Number('value must be a number');
        
        var error = rule('foo');
        
        expect(error).toEqual('value must be a number');
    });
});

// range

describe('range validator', function() {
    it('passes if value is in range', function() {
        var rule = new rules.Range(1, 10);
        
        var error = rule(5);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', function() {
        var rule = new rules.Range(1, 10);
        
        var error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an out-of-range property', function() {
        var rule = new rules.Range(1, 10);
        
        var error = rule(20);
        
        expect(error).toEqual('range');
    });

    it('can contain a custom message', function() {
        var rule = new rules.Range(1, 10, 'invalid number');
        
        var error = rule(20);
        
        expect(error).toEqual('invalid number');
    });
});

// oneOf

describe('oneOf validator', function() {
    it('passes if value is one of the valid options', function() {
        var rule = rules.OneOf(['red', 'blue', 'yellow']);
        
        var error = rule('blue');
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', function() {
        var rule = rules.OneOf(['red', 'blue', 'yellow']);
        
        var error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an out-of-array value', function() {
        var rule = rules.OneOf(['red', 'blue', 'yellow']);
        
        var error = rule('orange');
        
        expect(error).toEqual('oneOf');
    });

    it('can contain a custom message', function() {
        var rule = rules.OneOf(['red', 'blue', 'yellow'], 'must be a primary color');
        
        var error = rule('orange');
        
        expect(error).toEqual('must be a primary color');
    });
});
