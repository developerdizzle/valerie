import { array } from '../../src/rules';

describe('array validator', () => {
    it('passes if value is an array', () => {
        const rule = array();
        
        const error = rule([]);
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = array();
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('fails if value is not an array', () => {
        const rule = array();
        
        const error = rule('foo');
        
        expect(error).toEqual('array');
    });
    
    it('can contain a custom message', () => {
        const rule = array('value must be an array');
        
        const error = rule('foo');
        
        expect(error).toEqual('value must be an array');
    });
});