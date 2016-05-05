import createValidator from '../src';
import { required, number, oneOf, regex } from '../src/rules';
import { range } from '../src/rules/extended';

const schema = {
    id: [required(), number()],
    name: {
        first: required(),
        last: required()
    },
    age: range(1, 100),
    favoriteColor: oneOf(['blue', 'red', 'yellow'], 'invalid color'),
    email: regex(/^[^@]+@[^@]+\.[^@]+$/, 'invalid email address')
};

// tests
describe('example validator', () => {
    pit('finds expected errors', async () => {
        const v = createValidator(schema);
        
        const data = {
            id: 10,
            name: {
                first: 'foo'
            },
            age: 99,
            favoriteColor: 'potato',
            email: 'derp'
        };
        
        const errors = await v(data);
        
        expect(errors).toEqual([
            {
                property: 'name.last',
                message: 'required'
            },
            {
                property: 'favoriteColor',
                message: 'invalid color'
            },
            {
                property: 'email',
                message: 'invalid email address'
            }
        ]);
    });
    
    pit('finds expected first error', async () => {
        const v = createValidator(schema);
        
        const data = {
            id: 10,
            name: {
                first: 'foo'
            },
            age: 99,
            favoriteColor: 'potato'
        };
        
        const errors = await v(data, 1);
        
        expect(errors).toEqual([
            {
                property: 'name.last',
                message: 'required'
            }
        ]);
    });
});
