const validate = async (data, schema, maximum) => {
  if (Object.keys(schema).length === 0) return [];
  if (maximum === 0) return [];

  return validateCount('', data, schema, maximum);
};

const validateCount = async (parentPath, data = {}, schemata, maximum) => {
  let errors = [];

  // filter out array indices
  const keys = Object.keys(schemata).filter(isNaN);

  for (const key of keys) {
    const value = data[key];
    const schema = schemata[key];

    const path = (parentPath ? parentPath + '.' : '') + key;

    // direct rules
    let rules = [];
    if (typeof schema === 'function') rules = [schema];
    if (Array.isArray(schema)) rules = schema;

    // console.log(path, ' has ', rules.length, ' rules');

    for (const rule of rules) {
      const message = await Promise.resolve(rule(value));

      if (message) {
        errors.push({
          property: path,
          message
        });
      }

      if (errors.length >= maximum) return errors;
    }

    // sub schema
    const schemaKeys = Object.keys(schema).filter(isNaN);

    if (schemaKeys.length) {
      const subErrors = await validateCount(path, value, schema, maximum);

      if (subErrors.length) {
        errors = errors.concat(subErrors);

        if (errors.length >= maximum) return errors;
      }

      continue;
    }
  }

  return errors;
};

const createValidator = (schema = {}) => async (data = {}, maximum = Infinity) => validate(data, schema, maximum);

export default createValidator;
