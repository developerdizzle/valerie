import { not, is } from '../../src/rules';

describe('not validator', () => {
    pit('passes if given rule is not valid', async () => {
        const rule = not(is('bar'));
        
        const error = await rule('foo');
        
        expect(error).toBeUndefined();
    });

    pit('fails if given rule is valid', async () => {
        const rule = not(is('bar'));
        
        const error = await rule('bar');
        
        expect(error).toEqual('not');
    });
    
    pit('can contain a custom message', async () => {
        const rule = not(is('bar'), 'must not be bar');
        
        const error = await rule('bar');
        
        expect(error).toEqual('must not be bar');
    });
});