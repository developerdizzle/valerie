const and = (rules, message = 'and') => {
  return async value => {
    for (const rule of rules) {
      const error = await Promise.resolve(rule(value));

      if (error !== undefined) return message;
    }
  };
};

export default and;
