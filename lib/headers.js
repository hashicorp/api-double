/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function() {
  return function(request, response, next) {
    response.set({
      'Content-Type': 'application/json',
    });
    next();
  };
};
