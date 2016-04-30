const equalTo = (target, message = 'equalTo') => {
    return value => {
        if (value == target) return;
        
        return message;
    };
};

export default equalTo;