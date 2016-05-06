import { or, equalTo } from '../../src/rules';

describe('or validator', () => {
    pit('passes if one rule is valid', async () => {
        const rule = or([equalTo('bar'), equalTo('baz')]);
        
        const error = await rule('bar');
        
        expect(error).toBeUndefined();
    });

    pit('fails if both rules are not valid', async () => {
        const rule = or([equalTo('bar'), equalTo('baz')]);
        
        const error = await rule('foo');
        
        expect(error).toEqual('or');
    });
    
    pit('can contain a custom message', async () => {
        const rule = or([equalTo('bar'), equalTo('baz')], 'must equal bar or baz');
        
        const error = await rule('foo');
        
        expect(error).toEqual('must equal bar or baz');
    });
});