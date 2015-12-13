// gives back a function to validate
function Validator(validation) {
    return function(data, stopOnFail) {
        // returns a promise
        var promises = Validator.validate("", data, validation, stopOnFail);
        
        console.log('promises', promises);

        return Promise.all(promises).then(function(errors) {
            return errors.filter(function(error) {
               return error;
            });
        });
    };
}

// main data processor
Validator.validate = function(path, data, validation, stopOnFail) {
    var promises = [];
    
    // do this so that we can still validate subobjects
    if (typeof data === 'undefined') data = {};
    
    for (var property in validation) {
        var value = data[property];
        var rules = validation[property];
        
        var propertyPath = (path ? path + "." : "") + property;

        // sub objects
        if (typeof rules === 'object' && !Array.isArray(rules)) {
            var subpromises = Validator.validate(propertyPath, value, rules, stopOnFail);
            
            if (subpromises.length) {
                promises = promises.concat(subpromises);
            }
        }
        
        // single validation rule - just convert it to an array and process it below
        if (typeof rules === 'function') rules = [rules];

        // process actual validation rules
        if (Array.isArray(rules)) {
            for (var i = 0; i < rules.length; i++) {
                var promise = rules[i](propertyPath, value);

                promises.push(promise);
            }
        }
    }
    
    return promises;
};

// validation rules

Validator.required = function(message) {
    message = message || 'required';
    
    var rule = function(path, value) {
        var data = { path: path, message: message };
        
        if (typeof value === 'undefined') return Promise.resolve(data);
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return Promise.resolve(data);
        
        if (Array.isArray(value) && value.length === 0) return Promise.resolve(data);
        
        return Promise.resolve();
    };
    
    return rule;
};

Validator.number = function(message) {
    message = message || 'number';
    
    var rule = function(path, value) {
        var data = { path: path, message: message };
        
        if (typeof value === 'undefined') return Promise.resolve();

        return !isNaN(value) ? Promise.resolve(data) : Promise.resolve(data);
    };
    
    return rule;
};

Validator.range = function(lower, upper, message) {
    message = message || 'range';
    
    var rule = function(path, value) {
        var data = { path: path, message: message };
        
        if (typeof value === 'undefined') return Promise.resolve();
        
        return value >= lower && value <= upper ? Promise.resolve() : Promise.resolve(data);
    };
    
    return rule;
};

Validator.oneOf = function(options, message) {
    message = message || 'oneOf';
    
    var rule = function(path, value) {
        var data = { path: path, message: message };
        
        if (typeof value === 'undefined') return Promise.resolve();

        return options.indexOf(value) !== -1 ? Promise.resolve() : Promise.resolve(data);
    };
    
    return rule;
};

module.exports = Validator;