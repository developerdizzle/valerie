const greaterThan = (target, message = 'greaterThan') => {
  return value => {
    if (value > target) return;

    return message;
  };
};

export default greaterThan;
