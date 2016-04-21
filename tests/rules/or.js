import or from '../../src/rules/or';
import equals from '../../src/rules/equals';

describe('or validator', () => {
    it('passes if one rule is valid', () => {
        const rule = or([equals('bar'), equals('baz')]);
        
        const error = rule('bar');
        
        expect(error).toBeUndefined();
    });

    it('fails if both rules are not valid', () => {
        const rule = or([equals('bar'), equals('baz')]);
        
        const error = rule('foo');
        
        expect(error).toEqual('or');
    });
    
    it('can contain a custom message', () => {
        const rule = or([equals('bar'), equals('baz')], 'must equal bar or baz');
        
        const error = rule('foo');
        
        expect(error).toEqual('must equal bar or baz');
    });
});