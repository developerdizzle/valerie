function Validator(validation) {
    return function(data, stopOnFail) {
        return Validator.validate("", data, validation, stopOnFail);
    };
}

Validator.validate = function(path, data, validation, stopOnFail) {
    if (Object.keys(validation).length === 0) return Promise.resolve();
    
    if (stopOnFail) return Validator.validateFirst(path, data, validation);
    
    var promises = Validator.validateAll(path, data, validation);
    
    return Promise.all(promises).then(function(errors) {
        return errors.filter(function(error) {
           return error;
        });
    });
};

Validator.validateAll = function validateAll(path, data, validation) {
    var promises = [];
    
    // do this so that we can still validate subobjects
    if (typeof data === 'undefined') data = {};
    
    for (var property in validation) {
        var value = data[property];
        var rules = validation[property];
        
        var propertyPath = (path ? path + "." : "") + property;

        // sub objects
        if (typeof rules === 'object' && !Array.isArray(rules)) {
            var subpromises = Validator.validateAll(propertyPath, value, rules);
            
            if (subpromises.length) {
                promises = promises.concat(subpromises);
            }
        }
        
        // single validation rule - just convert it to an array and process it below
        if (typeof rules === 'function') rules = [rules];

        // process actual validation rules
        if (Array.isArray(rules)) {
            for (var i = 0; i < rules.length; i++) {
                var promise = Promise.resolve(rules[i](value)).then(function(message) {
                    if (message) return {
                        property: propertyPath,
                        message: message
                    };
                });

                promises.push(promise);
            }
        }
    }
    
    return promises;
};

Validator.validateFirst = function validateFirst(path, data, validation) {
    var properties = Object.keys(validation);
    var p = 0;
    
    var processProperty = function(property) {
        if (typeof property === 'undefined') return;
        
        var rules = validation[property];
        
        // subobjects
        var value = data[property];

        var propertyPath = (path ? path + "." : "") + property;

        if (typeof rules === 'object' && !Array.isArray(rules)) {
            return Validator.validateFirst(propertyPath, value || { }, rules);
        }
        
        if (typeof rules === 'undefined') return;
        if (Array.isArray(rules) && rules.length === 0) return;
        
        var r = 0;
        
        if (!Array.isArray(rules)) rules = [rules];
        
        var processRule = function(rule) {
            if (typeof rule === 'undefined') return;

            var result = rule(value);
            
            return Promise.resolve(result).then(function(message) {
                if (message) return message;
                
                return processRule(rules[++r]);
            });
        };
        
        return processRule(rules[0]).then(function(message) {
            if (message) return [{
                property: propertyPath,
                message: message
            }];

            return processProperty(properties[++p]);
        });
    };
    
    return processProperty(properties[0]);
};

// validation rules

Validator.required = function(message) {
    message = message || 'required';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return message;
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return message;
        
        if (Array.isArray(value) && value.length === 0) return message;
    };
    
    return rule;
};

Validator.number = function(message) {
    message = message || 'number';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return;

        if (!isNaN(value)) return message;
    };
    
    return rule;
};

Validator.range = function(lower, upper, message) {
    message = message || 'range';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return;
        
        if (value < lower || value > upper) return message;
    };
    
    return rule;
};

Validator.oneOf = function(options, message) {
    message = message || 'oneOf';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return;

        if (options.indexOf(value) === -1) return message;
    };
    
    return rule;
};

module.exports = Validator;