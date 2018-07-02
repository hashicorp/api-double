module.exports = function(app) {
  return function(value, key) {
    app.use(value);
    return value;
  };
};
