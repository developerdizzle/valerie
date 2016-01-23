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
