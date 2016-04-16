const range = (lower, upper, message) => {
    message = message || 'range';
    
    return value => {
        if (typeof value === 'undefined') return;
        
        if (value < lower || value > upper) return message;
    };
};

module.exports = range;