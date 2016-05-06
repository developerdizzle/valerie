const defined = (message = 'defined') => {
  return value => {
    if (typeof value === 'undefined' || value === undefined) return message;
  };
};

export default defined;
