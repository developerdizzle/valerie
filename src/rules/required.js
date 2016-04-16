// const Required = (message = 'required') => {
const required = (message) => {
    message = message || 'required';
    
    return value => {
        if (typeof value === 'undefined') return message;
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return message;
        
        if (Array.isArray(value) && value.length === 0) return message;
    };
};

module.exports = required;
