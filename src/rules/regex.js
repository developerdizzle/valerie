const regex = (expression, message = 'regex') => {
  return value => {
    if (typeof value === 'undefined') return;

    const matches = value.match(expression);

    if (!matches) return message;
  };
};

export default regex;
