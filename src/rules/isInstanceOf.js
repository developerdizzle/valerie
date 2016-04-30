const isInstanceOf = (type, message = 'isInstanceOf') => {
    return value => {
        if (typeof value === 'undefined') return;
        if (value instanceof type) return;

        return message;
    };
};

export default isInstanceOf;