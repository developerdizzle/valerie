const not = (rule, message = 'not') => {
  return async value => {
    const error = await Promise.resolve(rule(value));

    if (error === undefined) return message;
  };
};

export default not;
