const oneOf = (options, message = 'oneOf') => {
  return value => {
    if (typeof value === 'undefined') return;

    if (options.indexOf(value) === -1) return message;
  };
};

export default oneOf;
