import createValidator from '../lib';

// simple control validator used for testing
const eq = (target, message = 'eq') => {
    return value => {
        if (value !== target) return message;
    };
};

const truth = eq(true, 'truth');
const truthPromise = value => Promise.resolve(truth(value));

// tests
describe('object validator', () => {
    pit('resolves empty array if there is no validation schema', async () => {
        const v = createValidator({ });
        
        const data = { 
            foo: true
        };
        
        const errors = await v(data);
        
        expect(errors).toEqual([]);
    });

    pit('resolves empty array if there are no errors', async () => {
        const v = createValidator({
            foo: truth
        });
        
        const data = { 
            foo: true
        };
        
        const errors = await v(data);
        
        expect(errors).toEqual([]);
    });

    pit('resolves with array of errors if there are any', async () => {
        const v = createValidator({
            foo: truth
        });
        
        const data = { };
        
        const errors = await v(data);
        
        expect(errors.length).toBe(1);
        expect(errors[0]).toEqual({
            property: 'foo',
            message: 'truth'
        });
    });

    pit('resolves a max of one error if stopOnFail is true', async () => {
        const v = createValidator({
            foo: truth,
            bar: truth
        });
        
        const data = { };
        
        const errors = await v(data, true);
        
        expect(errors.length).toBe(1);
        expect(errors[0]).toEqual({
            property: 'foo',
            message: 'truth'
        });
    });
    
    pit('validates subobjects', async () => {
        const v = createValidator({
            foo: {
                bar: truth,
            }
        });
        
        const data = { };
        
        const errors = await v(data);
        
        expect(errors.length).toBe(1);
        expect(errors[0]).toEqual({
            property: 'foo.bar',
            message: 'truth'
        });
    });
    
    pit('validates subobjects when count is one', async () => {
        const v = createValidator({
            foo: {
                bar: truth
            }
        });
        
        const data = { };
        
        const errors = await v(data, 1);
        
        expect(errors.length).toBe(1);
        expect(errors[0]).toEqual({
            property: 'foo.bar',
            message: 'truth'
        });
    });
    
    pit('validates using promise rules', async() => {

        const v = createValidator({
            foo: {
                bar: truthPromise
            }
        });
        
        const data = { };
        
        const errors = await v(data);
        
        expect(errors.length).toBe(1);
        expect(errors[0]).toEqual({
            property: 'foo.bar',
            message: 'truth'
        });
    });
    
    pit('does not trigger additional rules after finding the maximum amount of errors', async () => {
        const v = createValidator({
            foo: {
                bar: truthPromise,
                baz: truthPromise
            }
        });
        
        const data = { };
        
        const errors = await v(data, 1);
        
        expect(errors.length).toBe(1);
        expect(errors[0]).toEqual({
            property: 'foo.bar',
            message: 'truth'
        });
    });    
});
