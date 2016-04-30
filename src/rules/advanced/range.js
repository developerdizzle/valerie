import { equalTo, or, greaterThan, lessThan } from '../';

const range = (lower, upper, message = 'range') => {
    return value => {
        if (typeof value === 'undefined') return;
        
        const greaterThanOrEqualTo = or([greaterThan(lower), equalTo(lower)]);
        
        if (greaterThanOrEqualTo(value) !== undefined) return message;
        
        const lessThanOrEqualTo = or([lessThan(upper), equalTo(upper)]);
        
        if (lessThanOrEqualTo(value) !== undefined) return message;
    };
};

export default range;