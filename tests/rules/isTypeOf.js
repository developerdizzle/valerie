import isTypeOf from '../../src/rules/isTypeOf';

describe('isTypeOf validator', () => {
    class Foo {};

    it('passes if value is of the correct type', () => {
        const rule = isTypeOf('string');
        
        const error = rule('foo');
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = isTypeOf('string');
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('fails if value is not of the correct type', () => {
        const rule = isTypeOf('string');
        
        const error = rule(0);
        
        expect(error).toEqual('isTypeOf');
    });
    
    it('can contain a custom message', () => {
        const rule = isTypeOf('string', 'value must be a string');
        
        const error = rule(0);
        
        expect(error).toEqual('value must be a string');
    });
});