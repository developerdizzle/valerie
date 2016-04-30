import greaterThan from '../../src/rules/greaterThan';

describe('greaterThan validator', () => {
    it('passes if value is greater than target', () => {
        const rule = greaterThan(0);
        
        const error = rule(1);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = greaterThan(0);
        
        const error = rule(undefined);
        
        expect(error).toEqual('greaterThan');
    });
    
    it('fails if value is not greater than target', () => {
        const rule = greaterThan(0);
        
        const error = rule(0);
        
        expect(error).toEqual('greaterThan');
    });
    
    it('can contain a custom message', () => {
        const rule = greaterThan(0, 'must be a positive number');
        
        const error = rule(0);
        
        expect(error).toEqual('must be a positive number');
    });
});