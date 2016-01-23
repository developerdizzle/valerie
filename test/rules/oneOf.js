var OneOf = require('../../src/rules/oneOf');

describe('oneOf validator', function() {
    it('passes if value is one of the valid options', function() {
        var rule = OneOf(['red', 'blue', 'yellow']);
        
        var error = rule('blue');
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', function() {
        var rule = OneOf(['red', 'blue', 'yellow']);
        
        var error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an out-of-array value', function() {
        var rule = OneOf(['red', 'blue', 'yellow']);
        
        var error = rule('orange');
        
        expect(error).toEqual('oneOf');
    });

    it('can contain a custom message', function() {
        var rule = OneOf(['red', 'blue', 'yellow'], 'must be a primary color');
        
        var error = rule('orange');
        
        expect(error).toEqual('must be a primary color');
    });
});
