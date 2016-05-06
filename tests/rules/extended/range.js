import { range } from '../../../src/rules/extended';

describe('range validator', () => {
    pit('passes if value is in range', async () => {
        const rule = range(1, 10);
        
        const error = await rule(5);
        
        expect(error).toBeUndefined();
    });

    pit('passes if value is undefined', async () => {
        const rule = range(1, 10);
        
        const error = await rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    pit('finds an out-of-range property', async () => {
        const rule = range(1, 10);
        
        const error = await rule(20);
        
        expect(error).toEqual('range');
    });

    pit('can contain a custom message', async () => {
        const rule = range(1, 10, 'invalid number');
        
        const error = await rule(20);
        
        expect(error).toEqual('invalid number');
    });
});