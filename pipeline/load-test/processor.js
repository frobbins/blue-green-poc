module.exports = {
    addErrorFlag: (requestParams, _context, ee, next) => {
        // Ensure requestParams.headers is initialized
        requestParams.headers = requestParams.headers || {};

        if (Math.random() < 0.5) { // 50% chance to include the error flag
            console.error('Setting the error-flag to true in the header request');
            requestParams.headers['error-flag'] = 'true';
        }
        return next(); // MUST be called for the scenario to continue
    },
};
