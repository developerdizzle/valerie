const and = (rules, message = 'and') => {
  return value => {
    for (const rule of rules) {
      const error = rule(value);

      if (error !== undefined) return message;
    }
  };
};

export default and;
