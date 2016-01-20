module.exports = function number(message) {
    message = message || 'number';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return;

        if (isNaN(value)) return message;
    };
    
    return rule;
};