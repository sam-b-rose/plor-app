const path = require('path');

require('dotenv').config({
  silent: true,
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
});

module.exports = {
  build: {
    extractCSS: true,
    vendor: ['axios'],
    postcss: [require('autoprefixer')()]
  },
  buildDir: 'dist/client',
  cache: true,
  css: ['@/assets/style/main.scss'],
  env: {
    HOST: process.env.HOST,
    PORT: process.env.PORT
  },
  head: {
    title: 'plor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'plor',
        name: 'plor.io',
        content: 'Social media management with ease.'
      }
    ]
  },
  manifest: {
    name: 'plor',
    description: 'A social media post scheduler',
    theme_color: '#2b67f5'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache',
    'nuxt-sass-resources-loader'
  ],
  sassResources: ['@/assets/style/variables.scss'],
  plugins: ['~/plugins/axios', '~/plugins/font-awesome'],
  loading: {
    color: '#2b67f5'
  },
  render: {
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', 'public, max-age=0');
        }
      }
    }
  },
  router: {
    middleware: ['https']
  },
  srcDir: path.resolve(__dirname, 'src', 'client')
};
