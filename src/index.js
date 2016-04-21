const validate = async (data, schema, maximum) => {
    if (Object.keys(schema).length === 0) return [];
    if (maximum === 0) return [];

    return validateCount("", data, schema, maximum);
};

const validateCount = async (path, data = {}, schema, maximum) => {
    let errors = [];
    
    for (const key in schema) {
        const value = data[key];
        let rules = schema[key];
        
        const subPath = (path ? path + "." : "") + key;

        // sub objects
        if (typeof rules === 'object' && !Array.isArray(rules)) {
            const subErrors = await validateCount(subPath, value, rules, maximum);
            
            if (subErrors.length) {
                errors = errors.concat(subErrors);
                
                if (errors.length >= maximum) return errors;
            }
            
            continue;
        }
        
        // single validation rule - just convert it to an array and process it below
        if (typeof rules === 'function') rules = [rules];

        if (!Array.isArray(rules)) return errors;

        // process actual validation rules
        for (const rule of rules) {
            const message = await Promise.resolve(rule(value));

            if (message) errors.push({
                property: subPath,
                message
            });
            
            if (errors.length >= maximum) return errors;
        }
    }
    
    return errors;
};

const createValidator = (schema = {}) => async (data = {}, maximum = Infinity) => validate(data, schema, maximum);

export default createValidator;
