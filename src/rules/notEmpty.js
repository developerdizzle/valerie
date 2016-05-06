const notEmpty = (target, message = 'notEmpty') => {
  return value => {
    if (typeof value === 'undefined') return;

    if (value === null) return message;

    if (typeof value === 'string' && value.trim() === '') return message;

    if (Array.isArray(value) && value.length === 0) return message;
  };
};

export default notEmpty;
