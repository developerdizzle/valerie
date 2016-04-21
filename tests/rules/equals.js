import equals from '../../src/rules/equals';

describe('equals validator', () => {
    it('passes if value equals target', () => {
        const rule = equals('bar');
        
        const error = rule('bar');
        
        expect(error).toBeUndefined();
    });

    it('fails if value is undefined', () => {
        const rule = equals('bar');
        
        const error = rule(undefined);
        
        expect(error).toEqual('equals');
    });
    
    it('fails if value does not equal target', () => {
        const rule = equals('bar');
        
        const error = rule('foo');
        
        expect(error).toEqual('equals');
    });
    
    it('can contain a custom message', () => {
        const rule = equals('bar', 'must equal bar');
        
        const error = rule('foo');
        
        expect(error).toEqual('must equal bar');
    });
});