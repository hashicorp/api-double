module.exports = function(Template, getVars) {
  return function(vars) {
    return new Template(vars.content.toString()).render(getVars(vars));
  };
};
