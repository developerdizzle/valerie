import { contains } from '../../src/rules';

describe('contains validator', () => {
    it('passes if value contains item', () => {
        const rule = contains('foo');
        
        const error = rule(['foo']);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = contains('foo');
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('fails if value does not contain item', () => {
        const rule = contains('foo');
        
        const error = rule(['bar']);
        
        expect(error).toEqual('contains');
    });

    it('can contain a custom message', () => {
        const rule = contains('foo', 'must contain foo');
        
        const error = rule(['bar']);
        
        expect(error).toEqual('must contain foo');
    });
});
