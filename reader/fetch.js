/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function(url) {
  return fetch(url).then(function(response) {
    if (response.status === 200) {
      return response.text();
    } else {
      return Promise.reject();
    }
  });
};
