import hasProperty from '../../src/rules/hasProperty';

describe('hasProperty validator', () => {
    it('passes if value has property', () => {
        const rule = hasProperty('bar');
        
        const error = rule({
            bar: true
        });
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = hasProperty('bar');
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('fails if value does not have property', () => {
        const rule = hasProperty('bar');
        
        const error = rule({});
        
        expect(error).toEqual('hasProperty');
    });
    
    it('can contain a custom message', () => {
        const rule = hasProperty('bar', 'must contain bar');
        
        const error = rule({});
        
        expect(error).toEqual('must contain bar');
    });
});