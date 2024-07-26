module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: false,
    path: require.resolve('path-browserify'),
    util: require.resolve('util')
  };
  return config;
};
