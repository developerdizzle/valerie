import Valerie from '../src';
import rules from '../src/rules';

const required = rules.required();
const number = rules.number();
const validAge = rules.range(1, 100);
const validColor = rules.oneOf(['blue', 'red', 'yellow'], 'invalid color');

const schema = {
    id: [required, number],
    name: {
        first: required,
        last: required
    },
    age: validAge,
    favoriteColor: validColor
};

// tests
describe('example validator', () => {
    pit('finds expected errors', async () => {
        const v = new Valerie(schema);
        
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
        const v = new Valerie(schema);
        
        const data = {
            id: 10,
            name: {
                first: 'foo'
            },
            age: 99,
            favoriteColor: 'potato'
        };
        
        const errors = await v(data, true);
        
        expect(errors).toEqual([
            {
                property: 'name.last',
                message: 'required'
            }
        ]);
    });    
});
