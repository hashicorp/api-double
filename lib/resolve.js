/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function(resolve, dir) {
  return function(url = '') {
    return resolve(dir + url) + (url.substr(url.length - 1) === '/' ? '/index' : '');
  };
};
