import { regex } from '../../src/rules';

describe('regex validator', () => {
    it('passes if value matches', () => {
        const rule = regex(/[abc]/);
        
        const error = rule('a');
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = regex(/[abc]/);
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an unmatched property', () => {
        const rule = regex(/[abc]/);
        
        const error = rule('d');
        
        expect(error).toEqual('regex');
    });
    
    it('can contain a custom message', () => {
        const rule = regex(/[abc]/, 'must contain a, b, or c');
        
        const error = rule('d');
        
        expect(error).toEqual('must contain a, b, or c');
    });
});