import hasOneOf from '../../src/rules/hasOneOf';

describe('hasOneOf validator', () => {
    it('passes if value has property', () => {
        const rule = hasOneOf(['bar', 'baz']);
        
        const error = rule({
            bar: true
        });
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = hasOneOf(['bar', 'baz']);
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('fails if value does not have property', () => {
        const rule = hasOneOf(['bar', 'baz']);
        
        const error = rule({});
        
        expect(error).toEqual('hasOneOf');
    });
    
    it('can contain a custom message', () => {
        const rule = hasOneOf(['bar', 'baz'], 'must contain bar or baz');
        
        const error = rule({});
        
        expect(error).toEqual('must contain bar or baz');
    });
});