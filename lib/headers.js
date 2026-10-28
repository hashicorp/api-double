/**
 * Copyright IBM Corp. 2018, 2026
 */

module.exports = function() {
  return function(request, response, next) {
    response.set({
      'Content-Type': 'application/json',
    });
    next();
  };
};
