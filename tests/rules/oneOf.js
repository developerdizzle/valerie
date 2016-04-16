jest.unmock('../../src/rules/oneOf');

import oneOf from '../../src/rules/oneOf';

describe('oneOf validator', () => {
    it('passes if value is one of the valid options', () => {
        const rule = oneOf(['red', 'blue', 'yellow']);
        
        const error = rule('blue');
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = oneOf(['red', 'blue', 'yellow']);
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('finds an out-of-array value', () => {
        const rule = oneOf(['red', 'blue', 'yellow']);
        
        const error = rule('orange');
        
        expect(error).toEqual('oneOf');
    });

    it('can contain a custom message', () => {
        const rule = oneOf(['red', 'blue', 'yellow'], 'must be a primary color');
        
        const error = rule('orange');
        
        expect(error).toEqual('must be a primary color');
    });
});
