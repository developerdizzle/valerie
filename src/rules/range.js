module.exports = function range(lower, upper, message) {
    message = message || 'range';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return;
        
        if (value < lower || value > upper) return message;
    };
    
    return rule;
};