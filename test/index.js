var Validator = require('../src/index');

var required = Validator.required();
var validAge = Validator.range(1, 100);
var validColor = Validator.oneOf(['blue', 'black', 'green', 'orange', 'red', 'yellow', 'green']);

describe('validator', function() {
    it('finds a required property', function() {
        var v = new Validator({
            name: required
        });
        
        var data = {};
        
        var errors = v(data);
        
        expect(errors.name).toEqual(['required']);
    });

    it('finds an out-of-range property', function() {
        var v = new Validator({
            age: validAge
        });
        
        var data = {
            age: 200
        };
        
        var errors = v(data);
        
        expect(errors.age).toEqual(['range']);
    });

    it('finds an out-of-array property', function() {
        var v = new Validator({
            color: validColor
        });
        
        var data = {
            color: 'magenta'
        };
        
        var errors = v(data);
        
        expect(errors.color).toEqual(['oneOf']);
    });
});