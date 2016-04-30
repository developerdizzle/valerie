const or = (rules, message = 'or') => {
    return value => {
        for (const rule of rules) {
            const error = rule(value);
            
            if (error === undefined) return;
        }
        
        return message;
    };
};

export default or;