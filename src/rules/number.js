const number = (message = 'number') => {
    return value => {
        if (typeof value === 'undefined') return;

        if (isNaN(value)) return message;
    };
};

export default number;