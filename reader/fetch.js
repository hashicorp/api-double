/**
 * Copyright IBM Corp. 2018, 2026
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
