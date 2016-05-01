const isTypeOf = (type, message = 'isTypeOf') => {
  return value => {
    if (typeof value === 'undefined') return;
    if (typeof value === type) return;

    return message;
  };
};

export default isTypeOf;
