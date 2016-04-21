const range = (lower, upper, message = 'range') => {
    return value => {
        if (typeof value === 'undefined') return;
        
        if (value < lower || value > upper) return message;
    };
};

export default range;