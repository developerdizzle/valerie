var Number = require('../../src/rules/number');

describe('number validator', function() {
    it('passes if value is a number', function() {
        var rule = new Number();
        
        var error = rule(5);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', function() {
        var rule = new Number();
        
        var error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an invalid number property', function() {
        var rule = new Number();
        
        var error = rule('foo');
        
        expect(error).toEqual('number');
    });
    
    it('can contain a custom message', function() {
        var rule = new Number('value must be a number');
        
        var error = rule('foo');
        
        expect(error).toEqual('value must be a number');
    });
});