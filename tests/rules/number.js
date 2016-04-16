jest.unmock('../../src/rules/number');

import number from '../../src/rules/number';

describe('number validator', () => {
    it('passes if value is a number', () => {
        const rule = number();
        
        const error = rule(5);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = number();
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an invalid number property', () => {
        const rule = number();
        
        const error = rule('foo');
        
        expect(error).toEqual('number');
    });
    
    it('can contain a custom message', () => {
        const rule = number('value must be a number');
        
        const error = rule('foo');
        
        expect(error).toEqual('value must be a number');
    });
});