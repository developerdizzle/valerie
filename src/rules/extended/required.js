import { and, defined, notEmpty } from '../';

const required = (message = 'required') => {
  return and([ defined(), notEmpty() ], message);
};

export default required;
