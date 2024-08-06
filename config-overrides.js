module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: false,
    util: require.resolve('util'),
    path: false
  };
  return config;
};
