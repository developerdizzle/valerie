import { isInstanceOf } from '../../src/rules';

describe('isInstanceOf validator', () => {
    class Foo {};

    it('passes if value is an instance of class', () => {
        const rule = isInstanceOf(Foo);
        
        const bar = new Foo();

        const error = rule(new Foo());
        
        expect(error).toBeUndefined();
    });

    it('passes if value is undefined', () => {
        const rule = isInstanceOf(Foo);
        
        const error = rule(undefined);
        
        expect(error).toBeUndefined();
    });
    
    it('fails if value is not an instance of class', () => {
        const rule = isInstanceOf(Foo);
        
        const error = rule('bar');
        
        expect(error).toEqual('isInstanceOf');
    });
    
    it('can contain a custom message', () => {
        const rule = isInstanceOf(Foo, 'value must be an instance of Foo');
        
        const error = rule('bar');
        
        expect(error).toEqual('value must be an instance of Foo');
    });
});