import createValidator from '../src';
import { number, hasProperty } from '../src/rules';

const schema = {
    foo: Object.assign(hasProperty('bar'), {
        bar: number(),
        baz: number(),
        qux: number()
    })
};


// tests
describe('object.assign validator', () => {
    pit('finds target rule errors', async () => {
        const v = createValidator(schema);
        
        const errors = await v({
            foo: { }
        });
        
        expect(errors).toEqual([
            {
                property: 'foo',
                message: 'hasProperty'
            }
        ]);
    });
    
    pit('finds source rule errors', async () => {
        const v = createValidator(schema);
        
        const errors = await v({
            foo: {
                bar: 'nan'
            }
        });
        
        expect(errors).toEqual([
            {
                property: 'foo.bar',
                message: 'number'
            }
        ]);
    });
    
    pit('finds target and source rule errors', async () => {
        const v = createValidator(schema);
        
        const errors = await v({
            foo: {
                qux: 'nan'
            }
        });
        
        expect(errors).toEqual([
            {
                property: 'foo',
                message: 'hasProperty'
            },
            {
                property: 'foo.qux',
                message: 'number'
            }
        ]);
    });      
});