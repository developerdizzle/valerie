const number = message => {
    message = message || 'number';
    
    return value => {
        if (typeof value === 'undefined') return;

        if (isNaN(value)) return message;
    };
};

module.exports = number;