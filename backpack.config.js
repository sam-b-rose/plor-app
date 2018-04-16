const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = path.resolve(__dirname, 'src', 'server', 'index.js');
    config.output.path = path.resolve(__dirname, 'dist', 'server');
    config.resolve.alias = {
      '~/': path.resolve(__dirname, 'src', 'server')
    };
    return config;
  }
};
