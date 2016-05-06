import { and, defined, equalTo } from '../../src/rules';

describe('and validator', () => {
    it('passes if all rules are valid', () => {
        const rule = and([ defined(), equalTo('bar') ]);
        
        const error = rule('bar');
        
        expect(error).toBeUndefined();
    });

    it('fails if any rule is not valid', () => {
        const rule = and([ defined(), equalTo('bar') ]);
        
        const error = rule('foo');
        
        expect(error).toEqual('and');
    });
    
    it('can contain a custom message', () => {
        const rule = and([ defined(), equalTo('bar') ], 'must be defined and equal "bar"');
        
        const error = rule('foo');
        
        expect(error).toEqual('must be defined and equal "bar"');
    });
});