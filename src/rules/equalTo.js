const equalTo = (target, message = 'equalTo') => {
  return value => {
    /* eslint-disable eqeqeq */
    if (value == target) return;
    /* eslint-enable eqeqeq */

    return message;
  };
};

export default equalTo;
