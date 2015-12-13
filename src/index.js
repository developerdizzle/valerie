// gives back a function to validate
function Validator(validation) {
    return function(data, stopOnFail) {
        var errors = Validator.validate("", data, validation, stopOnFail);

        return errors;  
    };
}

// main data processor
Validator.validate = function(path, data, validation, stopOnFail) {
    var errors = [];
    
    // do this so that we can still validate subobjects
    if (typeof data === 'undefined') data = {};
    
    for (var property in validation) {
        var value = data[property];
        var rules = validation[property];
        
        var propertyPath = (path ? path + "." : "") + property;

        // sub objects
        if (typeof rules === 'object' && !Array.isArray(rules)) {
            var subvalidation = Validator.validate(propertyPath, value, rules, stopOnFail);
            
            if (subvalidation.length) {
                errors = errors.concat(subvalidation);

                if (stopOnFail && errors.length) return errors;
            }
        }
        
        // single validation rule - just convert it to an array and process it below
        if (typeof rules === 'function') rules = [rules];

        // process actual validation rules
        if (Array.isArray(rules)) {
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                
                var passed = rule(value);
                
                if (!passed) {
                    var message = (rule.message ? (typeof rule.message === 'function' ? rule.message(property) : rule.message) : rule.name);
                    
                    errors.push({
                        property: propertyPath,
                        message: message
                    });
                    
                    if (stopOnFail) return errors;
                }
            }
        }
    }
    
    return errors;
};

// validation rules

Validator.required = function(message) {
    var rule = function(value) {
        if (typeof value === 'undefined') return false;
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return false;
        
        if (Array.isArray(value) && value.length === 0) return false;
        
        return true;
    };
    
    rule.message = message || 'required';
    
    return rule;
};

Validator.number = function(message) {
    var rule = function(value) {
        if (typeof value === 'undefined') return true;

        return !isNaN(value);
    };
    
    rule.message = message || 'number';
    
    return rule;
};

Validator.range = function(lower, upper, message) {
    var rule = function(value) {
        if (typeof value === 'undefined') return true;
        
        return value >= lower && value <= upper;
    };
    
    rule.message = message || 'range';
    
    return rule;
};

Validator.oneOf = function(options, message) {
    var rule = function(value) {
        if (typeof value === 'undefined') return true;

        return options.indexOf(value) !== -1;
    };
    
    rule.message = message || 'oneOf';
    
    return rule;
};

module.exports = Validator;