"use strict";

class Valerie {
    constructor(schema) {
        return function(data, stopOnFail) {
            return Valerie.validate("", data, schema, stopOnFail);
        };
    }
    
    static validate(path, data, schema, stopOnFail) {
        if (Object.keys(schema).length === 0) return Promise.resolve();
        
        if (stopOnFail) return Valerie.validateFirst(path, data, schema);
        
        const promises = Valerie.validateAll(path, data, schema);
        
        // TODO: collapse this shizzle
        return Promise.all(promises).then(errors => {
            return errors.filter(error => {
               return error;
            });
        });
    }
    
    static validateAll(path, data, schema) {
        let promises = [];
        
        // do this so that we can still validate subobjects
        if (typeof data === 'undefined') data = {};
        
        for (const property in schema) {
            const value = data[property];
            let rules = schema[property];
            
            const propertyPath = (path ? path + "." : "") + property;
    
            // sub objects
            if (typeof rules === 'object' && !Array.isArray(rules)) {
                const subpromises = Valerie.validateAll(propertyPath, value, rules);
                
                if (subpromises.length) {
                    promises = promises.concat(subpromises);
                }
            }
            
            // single validation rule - just convert it to an array and process it below
            if (typeof rules === 'function') rules = [rules];
    
            // process actual validation rules
            if (Array.isArray(rules)) {
                for (const rule of rules) {
                    const promise = Promise.resolve(rule(value)).then(message => {
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
    }
    
    static validateFirst(path, data, schema) {
        const properties = Object.keys(schema);
        let p = 0;
        
        const processProperty = property => {
            if (typeof property === 'undefined') return;
            
            let rules = schema[property];
            
            // subobjects
            const value = data[property];
    
            const propertyPath = (path ? path + "." : "") + property;
    
            if (typeof rules === 'object' && !Array.isArray(rules)) {
                return Valerie.validateFirst(propertyPath, value || { }, rules);
            }
            
            if (typeof rules === 'undefined') return;
            if (Array.isArray(rules) && rules.length === 0) return;
            
            let r = 0;
            
            if (!Array.isArray(rules)) rules = [rules];
            
            const processRule = function(rule) {
                if (typeof rule === 'undefined') return;
    
                const result = rule(value);
                
                return Promise.resolve(result).then(message => {
                    if (message) return message;
                    
                    return processRule(rules[++r]);
                });
            };
            
            return processRule(rules[0]).then(message => {
                if (message) return [{
                    property: propertyPath,
                    message: message
                }];
    
                return processProperty(properties[++p]);
            });
        };
        
        return processProperty(properties[0]);
    }
}

module.exports = Valerie;
