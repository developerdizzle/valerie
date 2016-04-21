const required = (message = 'required') => {
    return value => {
        if (typeof value === 'undefined') return message;
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return message;
        
        if (Array.isArray(value) && value.length === 0) return message;
    };
};

export default required;
