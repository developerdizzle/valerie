const or = (rules, message = 'or') => {
  return async value => {
    for (const rule of rules) {
      const error = await Promise.resolve(rule(value));

      if (error === undefined) return;
    }

    return message;
  };
};

export default or;
