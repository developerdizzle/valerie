import { and, defined, equalTo } from '../../src/rules';

describe('and validator', () => {
    pit('passes if all rules are valid', async () => {
        const rule = and([ defined(), equalTo('bar') ]);
        
        const error = await Promise.resolve(rule('bar'));
        
        expect(error).toBeUndefined();
    });

    pit('fails if any rule is not valid', async () => {
        const rule = and([ defined(), equalTo('bar') ]);
        
        const error = await Promise.resolve(rule('foo'));
        
        expect(error).toEqual('and');
    });
    
    pit('can contain a custom message', async () => {
        const rule = and([ defined(), equalTo('bar') ], 'must be defined and equal "bar"');
        
        const error = await Promise.resolve(rule('foo'));
        
        expect(error).toEqual('must be defined and equal "bar"');
    });
});