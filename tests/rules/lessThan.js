import { lessThan } from '../../src/rules';

describe('lessThan validator', () => {
    it('passes if value is less than target', () => {
        const rule = lessThan(0);
        
        const error = rule(-1);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = lessThan(0);
        
        const error = rule(undefined);
        
        expect(error).toEqual('lessThan');
    });
    
    it('fails if value is not less than target', () => {
        const rule = lessThan(0);
        
        const error = rule(0);
        
        expect(error).toEqual('lessThan');
    });
    
    it('can contain a custom message', () => {
        const rule = lessThan(0, 'must be a negative number');
        
        const error = rule(0);
        
        expect(error).toEqual('must be a negative number');
    });
});