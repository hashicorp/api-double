module.exports = function(locationFactory, range, env, fake) {
  env = typeof env === 'undefined' ? process.env : env;
  return function(vars) {
    if((vars.cookies['HC_API_DOUBLE_LOCALE'] || '').length > 0) {
      fake.locale = vars.cookies['HC_API_DOUBLE_LOCALE'];
    }
    if (typeof seed === 'undefined') {
      seed = fake.datatype.number();
    } else {
      seed = parseInt(seed);
    }
    if((vars.cookies['HC_API_DOUBLE_SEED'] || '').length > 0) {
      seed = vars.cookies['HC_API_DOUBLE_SEED'];
    }

    // helper to get a deterministic number from a string if it isn't already a number
    const seedStr = function(s) {
      if(!isNaN(s)) {
        return parseInt(s);
      }
      for(var i = 0, h = 0xdeadbeef; i < s.length; i++)
          h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
      return (h ^ h >>> 16) >>> 0;
    };
    fake.seed(seedStr(seed));
    return Object.assign(vars, {
      fake: fake,
      location: locationFactory(vars.href, vars.query),
      seed: function(seed) {
        fake.seed(seedStr(seed));
      },
      range: function(a, b) {
        if (typeof b !== 'undefined') {
          b = parseInt(b);
        }
        return range(parseInt(a), b);
      },
      http: {
        headers: vars.headers || {},
        body: vars.body || {},
        method: vars.method || 'GET',
        cookies: vars.cookies || {},
      },
      env: function(key, def) {
        key = key.toUpperCase();
        return (
          [
            this.http.cookies[key],
            env[key],
            this.http.headers[`X-${key.replace('_', '-')}`],
            def,
            null,
          ].reduce(
            function(prev, item) {
              if(typeof prev !== 'undefined') {
                return prev;
              }
              return item;
            }
          )
        );
      },
    });
  };
};

