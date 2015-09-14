// gives back a function to validate
function Validator(validation) {
    return function(data, stopOnFail) {
        var errors = Validator.validate(data, validation, stopOnFail);

        return errors;  
    };
}

// first helper method
Validator.first = function(errors) {
    for (var key in errors) {
        var value = errors[key];
        
        if (Array.isArray(value)) return value[0];
        
        if (typeof value === 'object') return Validator.first(value);
    }
    
    return undefined;
};

// main data processor
Validator.validate = function(data, validation, stopOnFail) {
    var errors = {};
    
    // do this so that we can still validate subobjects
    if (typeof data === 'undefined') data = {};
    
    for (var property in validation) {
        var value = data[property];
        var rule = validation[property];
        
        // sub objects
        if (typeof rule === 'object' && !Array.isArray(rule)) {
            var subvalidation = Validator.validate(value, rule, stopOnFail);
            
            if (typeof subvalidation !== 'undefined') {
                errors[property] = subvalidation;

                //TODO not working
                if (errors[property].length && stopOnFail) {
                    console.log('should be returning');
                    
                    return errors;
                }
            }
        }
        
        // single validation rule - just convert it to an array and process it below
        if (typeof rule === 'function') {
            rule = [rule];
        }

        // process actual validation rules
        if (Array.isArray(rule)) {
            for (var i=0; i<rule.length; i++) {
                var r = rule[i];
                
                var passed = r(value);
                
                if (!passed) {
                    errors[property] = errors[property] || [];
                    
                    var message = (r.message ? (typeof r.message === 'function' ? r.message(property) : r.message) : r.name).replace('{property}', property);
                    
                    errors[property].push(message);
                    
                    if (stopOnFail) return errors;
                }
            }
        }
    }
    
    return Object.keys(errors).length !== 0 ? errors : undefined;
};

// validation rules

Validator.required = function(message) {
    var rule = function required(value) {
        if (typeof value === 'undefined') return false;
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return false;
        
        if (Array.isArray(value) && value.length === 0) return false;
        
        return true;
    };
    
    rule.message = message ||  'required';
    
    return rule;
};

Validator.number = function() {
    return function number(value) {
        if (typeof value === 'undefined') return true;

        return !isNaN(value);
    };
};

Validator.range = function(lower, upper) {
    return function range(value) {
        if (typeof value === 'undefined') return true;
        
        return value >= lower && value <= upper;
    };
};

Validator.oneOf = function(options) {
    return function oneOf(value) {
        if (typeof value === 'undefined') return true;

        return options.indexOf(value) !== -1;
    };
};

module.exports = Validator;