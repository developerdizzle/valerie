const hasOneOf = (properties, message = 'hasOneOf') => {
    return value => {
        if (typeof value === 'undefined') return;

        for (const property of properties) {
            if (value.hasOwnProperty(property)) return;
        }
        
        return message;
    };
};

export default hasOneOf;