const not = (rule, message = 'not') => {
  return value => {
    if (rule(value) === undefined) return message;
  };
};

export default not;
