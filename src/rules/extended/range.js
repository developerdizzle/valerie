import { equalTo, or, and, greaterThan, lessThan } from '../';

const range = (lower, upper, message = 'range') => {
  const greaterThanOrEqualTo = or([ greaterThan(lower), equalTo(lower) ]);
  const lessThanOrEqualTo = or([ lessThan(upper), equalTo(upper) ]);
  
  return and([ greaterThanOrEqualTo, lessThanOrEqualTo ], message);
};

export default range;
