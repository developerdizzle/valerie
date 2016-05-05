const contains = (item, message = 'contains') => {
  return value => {
    if (typeof value === 'undefined') return;

    if (value.indexOf(item) === -1) return message;
  };
};

export default contains;
