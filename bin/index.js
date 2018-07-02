#!/usr/bin/env node
require('../builder.js').then(function(builder) {
  builder.run('main');
});
