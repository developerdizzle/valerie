const Valerie = require('../src/index');

// simple control Valerie used for testing
const eq = (target, message) => {
    message = message || 'eq';
    
    return value => {
        if (value !== target) return message;
    };
};

const truth = eq(true, 'truth');

// tests
describe('object validator', () => {
    it('resolves undefined if there is no validation schema', done => {
        const v = new Valerie({ });
        
        const data = { 
            foo: true
        };
        
        v(data).then(errors => {
            expect(errors).toBeUndefined();
    
            done();
        });
    });

    it('resolves empty array if there are no errors', done => {
        const v = new Valerie({
            foo: truth
        });
        
        const data = { 
            foo: true
        };
        
        v(data).then(errors => {
            expect(errors.length).toBe(0);
    
            done();
        });
    });

    it('resolves with array of errors if there are any', done => {
        const v = new Valerie({
            foo: truth
        });
        
        const data = { };
        
        v(data).then(errors => {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo',
                message: 'truth'
            });
    
            done();
        });
    });

    it('resolves a max of one error if stopOnFail is true', done => {
        const v = new Valerie({
            foo: truth,
            bar: truth
        });
        
        const data = { };
        
        v(data, true).then(errors => {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo',
                message: 'truth'
            });
            
            done();
        });
    });
    
    it('validates subobjects', done => {
        const v = new Valerie({
            foo: {
                bar: truth,
            }
        });
        
        const data = { };
        
        v(data).then(errors => {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo.bar',
                message: 'truth'
            });
            
            done();
        });
    });
    
    it('validates subobjects when stopOnFail is true', done => {
        const v = new Valerie({
            foo: {
                bar: truth,
            }
        });
        
        const data = { };
        
        v(data, true).then(errors => {
            expect(errors.length).toBe(1);
            expect(errors[0]).toEqual({
                property: 'foo.bar',
                message: 'truth'
            });
            
            done();
        });
    });    
});
