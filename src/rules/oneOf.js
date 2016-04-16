const oneOf = (options, message) => {
    message = message || 'oneOf';
    
    return value => {
        if (typeof value === 'undefined') return;

        if (options.indexOf(value) === -1) return message;
    };
};

module.exports = oneOf;