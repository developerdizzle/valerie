const equals = (target, message = 'equals') => {
    return value => {
        if (value !== target) return message;
    };
};

export default equals;