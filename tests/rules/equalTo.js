import { equalTo } from '../../src/rules';

describe('equalTo validator', () => {
    it('passes if value loosely equals target', () => {
        const rule = equalTo('bar');
        
        const error = rule(new String('bar'));
        
        expect(error).toBeUndefined();
    });

    it('fails if value is undefined', () => {
        const rule = equalTo('bar');
        
        const error = rule(undefined);
        
        expect(error).toEqual('equalTo');
    });
    
    it('fails if value does not loosely equal target', () => {
        const rule = equalTo('bar');
        
        const error = rule('foo');
        
        expect(error).toEqual('equalTo');
    });
    
    it('can contain a custom message', () => {
        const rule = equalTo('bar', 'must equal bar');
        
        const error = rule('foo');
        
        expect(error).toEqual('must equal bar');
    });
});