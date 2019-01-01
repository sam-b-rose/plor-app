const path = require('path');

module.exports = {
  build: {
    extractCSS: true,
    vendor: ['axios', 'css-doodle'],
    postcss: {
      ident: 'postcss',
      plugins: [require('autoprefixer')()]
    }
  },
  buildDir: 'dist/client',
  cache: true,
  css: ['aos/dist/aos.css', 'animate.css', '@/assets/style/main.scss'],
  env: {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000
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
    theme_color: '#5300bc'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache',
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '@/assets/style/resources/_variables.scss',
    '@/assets/style/resources/_mixins.scss'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/font-awesome',
    '~/plugins/portal-vue'
  ],
  loading: {
    color: '#5300bc',
    height: '3px'
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
    middleware: ['https', 'ssr-cookie']
  },
  srcDir: path.resolve(__dirname, 'src', 'client')
};
