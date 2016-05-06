const lessThan = (target, message = 'lessThan') => {
  return value => {
    if (value === undefined) return;
    if (value < target) return;

    return message;
  };
};

export default lessThan;
