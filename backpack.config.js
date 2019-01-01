require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = path.resolve(__dirname, 'src', 'server', 'index.js');
    config.output.path = path.resolve(__dirname, 'dist', 'server');
    config.resolve.alias = {
      '~/': path.resolve(__dirname, 'src', 'server')
    };

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
};
