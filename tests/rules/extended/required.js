import { required } from '../../../src/rules/extended';

describe('required validator', () => {
    pit('passes if property has a value', async () => {
        const rule = required();
        
        const error = await rule('foo');

        expect(error).toBeUndefined();
    });
    
    pit('finds undefined values', async () => {
        const rule = required();
        
        const error = await rule(undefined);
        
        expect(error).toEqual('required');
    });

    pit('finds empty strings', async () => {
        const rule = required();
        
        const error = await rule(' ');
        
        expect(error).toEqual('required');        
    });

    pit('finds empty arrays', async () => {
        const rule = required();
        
        const error = await rule([]);
        
        expect(error).toEqual('required'); 
    });

    pit('can contain a custom message', async () => {
        const rule = required('name is required');
        
        const error = await rule(undefined);
        
        expect(error).toEqual('name is required');
    });
});