module.exports = function required(message) {
    message = message || 'required';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return message;
        
        if (typeof value === 'string' && (value === '' || value.trim() === '')) return message;
        
        if (Array.isArray(value) && value.length === 0) return message;
    };
    
    return rule;
};