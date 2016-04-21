import createValidator from '../src';
import { required, number, range, oneOf, regex, hasOneOf } from '../src/rules';

const barOrBaz = hasOneOf(['bar', 'baz'], 'barOrBaz');

const schema = {
    foo: Object.assign(barOrBaz, {
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
                message: 'barOrBaz'
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
                message: 'barOrBaz'
            },
            {
                property: 'foo.qux',
                message: 'number'
            }
        ]);
    });      
});