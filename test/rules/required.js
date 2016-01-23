var Required = require('../../src/rules/required');

describe('required validator', function() {
    it('passes if property has a value', function() {
        var rule = new Required();
        
        var error = rule('foo');
        
        expect(error).toBeUndefined();
    });
    
    it('finds undefined values', function() {
        var rule = new Required();
        
        var error = rule(undefined);
        
        expect(error).toEqual('required');
    });

    it('finds empty strings', function() {
        var rule = new Required();
        
        var error = rule('');
        
        expect(error).toEqual('required');        
    });

    it('finds empty arrays', function() {
        var rule = new Required();
        
        var error = rule([]);
        
        expect(error).toEqual('required'); 
    });

    it('can contain a custom message', function() {
        var rule = new Required('name is required');
        
        var error = rule(undefined);
        
        expect(error).toEqual('name is required');
    });
});