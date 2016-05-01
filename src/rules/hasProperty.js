const hasProperty = (property, message = 'hasProperty') => {
  return value => {
    if (typeof value === 'undefined') return;

    if (!value.hasOwnProperty(property)) return message;
  };
};

export default hasProperty;
