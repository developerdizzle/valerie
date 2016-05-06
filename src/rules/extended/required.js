import { and, defined, notEmpty } from '../';

const required = (message = 'required') => and([ defined(), notEmpty() ], message);

export default required;
