import required from '../../src/rules/required';

describe('required validator', () => {
    it('passes if property has a value', () => {
        const rule = required();
        
        const error = rule('foo');
        
        expect(error).toBeUndefined();
    });
    
    it('finds undefined values', () => {
        const rule = required();
        
        const error = rule(undefined);
        
        expect(error).toEqual('required');
    });

    it('finds empty strings', () => {
        const rule = required();
        
        const error = rule('');
        
        expect(error).toEqual('required');        
    });

    it('finds empty arrays', () => {
        const rule = required();
        
        const error = rule([]);
        
        expect(error).toEqual('required'); 
    });

    it('can contain a custom message', () => {
        const rule = required('name is required');
        
        const error = rule(undefined);
        
        expect(error).toEqual('name is required');
    });
});