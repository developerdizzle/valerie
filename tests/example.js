import createValidator from '../src';
import { required, number, range, oneOf } from '../src/rules';

const schema = {
    id: [required(), number()],
    name: {
        first: required(),
        last: required()
    },
    age: range(1, 100),
    favoriteColor: oneOf(['blue', 'red', 'yellow'], 'invalid color')
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
            favoriteColor: 'potato'
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
