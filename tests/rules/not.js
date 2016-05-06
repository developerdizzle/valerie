import { not, is } from '../../src/rules';

describe('not validator', () => {
    it('passes if given rule is not valid', () => {
        const rule = not(is('bar'));
        
        const error = rule('foo');
        
        expect(error).toBeUndefined();
    });

    it('fails if given rule is valid', () => {
        const rule = not(is('bar'));
        
        const error = rule('bar');
        
        expect(error).toEqual('not');
    });
    
    it('can contain a custom message', () => {
        const rule = not(is('bar'), 'must not be bar');
        
        const error = rule('bar');
        
        expect(error).toEqual('must not be bar');
    });
});