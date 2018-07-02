const tickControl = require('@gardenhq/tick-control');
const faker = require('faker');
const createRenderer = require('./lib/render');
const createResolver = require('./lib/resolve');
const createFinder = require('./lib/find');
const createController = require('./lib/controller');
const createVars = require('./vars/index');
const read = require('./reader/fetch');
// const read = require("./reader/html");
const locationFactory = require('./location/factory');
const range = require('array-range');
const YAML = require('js-yaml');

module.exports = function(seed, root, reader) {
  reader = typeof reader === 'undefined' ? read : reader;
  const resolve = createResolver(function(path) {
    return path[path.length - 1] === '/' ? path.substr(0, path.length - 1) : path;
  }, root);
  const find = createFinder(reader, root);
  const render = createRenderer(
    createVars(locationFactory(), range, window.localStorage),
    tickControl(),
    faker,
    seed
  );
  return function() {
    const mutations = [];
    const mutate = function(url, content, config) {
      return JSON.stringify(
        mutations
          .filter(function(item, i, arr) {
            // TODO: Deprecate checking on strings, should always be a callable
            let cb = item.url;
            if (typeof item.url !== 'function') {
              cb = function(actual) {
                return item.url === url;
              };
            }
            return cb(url);
          })
          .reduce(function(prev, item, i, arr) {
            return item.mutate(prev, config);
          }, JSON.parse(content))
      );
    };
    const addMutation = function(cb, url) {
      mutations.push({
        url: url,
        mutate: cb,
      });
    };
    const controller = createController(resolve, find, render, YAML, mutate);
    return {
      serve: controller,
      mutate: addMutation,
    };
  };
};
