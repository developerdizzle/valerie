const is = (target, message = 'is') => {
  return value => {
    if (value === target) return;

    return message;
  };
};

export default is;
