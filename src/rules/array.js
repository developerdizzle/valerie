const array = (message = 'array') => {
    return value => {
        if (typeof value === 'undefined') return;
        
        if (Array.isArray(value)) return;

        return message;
    };
};

export default array;