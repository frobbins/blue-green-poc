module.exports = {
    addErrorFlag: (requestParams, _context, ee, next) => {

        if (Math.random() < 0.5) { // 50% chance to include the error flag
            console.info('Setting the error-flag to true in the request');
            requestParams.url += '?error-flag=true';
        }
        return next(); // MUST be called for the scenario to continue
    },
};
