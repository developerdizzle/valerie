var Range = require('../../src/rules/range');

describe('range validator', function() {
    it('passes if value is in range', function() {
        var rule = new Range(1, 10);
        
        var error = rule(5);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', function() {
        var rule = new Range(1, 10);
        
        var error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an out-of-range property', function() {
        var rule = new Range(1, 10);
        
        var error = rule(20);
        
        expect(error).toEqual('range');
    });

    it('can contain a custom message', function() {
        var rule = new Range(1, 10, 'invalid number');
        
        var error = rule(20);
        
        expect(error).toEqual('invalid number');
    });
});