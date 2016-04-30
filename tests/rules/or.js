import { or, equalTo } from '../../src/rules';

describe('or validator', () => {
    it('passes if one rule is valid', () => {
        const rule = or([equalTo('bar'), equalTo('baz')]);
        
        const error = rule('bar');
        
        expect(error).toBeUndefined();
    });

    it('fails if both rules are not valid', () => {
        const rule = or([equalTo('bar'), equalTo('baz')]);
        
        const error = rule('foo');
        
        expect(error).toEqual('or');
    });
    
    it('can contain a custom message', () => {
        const rule = or([equalTo('bar'), equalTo('baz')], 'must equal bar or baz');
        
        const error = rule('foo');
        
        expect(error).toEqual('must equal bar or baz');
    });
});