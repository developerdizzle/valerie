import { range } from '../../../src/rules/extended';

describe('range validator', () => {
    it('passes if value is in range', () => {
        const rule = range(1, 10);
        
        const error = rule(5);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = range(1, 10);
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an out-of-range property', () => {
        const rule = range(1, 10);
        
        const error = rule(20);
        
        expect(error).toEqual('range');
    });

    it('can contain a custom message', () => {
        const rule = range(1, 10, 'invalid number');
        
        const error = rule(20);
        
        expect(error).toEqual('invalid number');
    });
});