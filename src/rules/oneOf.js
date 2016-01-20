module.exports = function oneOf(options, message) {
    message = message || 'oneOf';
    
    var rule = function(value) {
        if (typeof value === 'undefined') return;

        if (options.indexOf(value) === -1) return message;
    };
    
    return rule;
};