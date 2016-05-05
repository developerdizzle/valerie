import { is } from '../../src/rules';

describe('is validator', () => {
    it('passes if value strictly equals target', () => {
        const rule = is('bar');
        
        const error = rule('bar');
        
        expect(error).toBeUndefined();
    });

    it('fails if value is undefined', () => {
        const rule = is('bar');
        
        const error = rule(undefined);
        
        expect(error).toEqual('is');
    });
    
    it('fails if value does not strictly equal target', () => {
        const rule = is('bar');
        
        const error = rule(new String('bar'));
        
        expect(error).toEqual('is');
    });
    
    it('can contain a custom message', () => {
        const rule = is('bar', 'must equal bar');
        
        const error = rule('foo');
        
        expect(error).toEqual('must equal bar');
    });
});